import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/expenses - Fetch expenses (no auth required)
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, use a default user ID or remove userId entirely
    const DEFAULT_USER_ID = "demo-user"

    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { id: DEFAULT_USER_ID }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: DEFAULT_USER_ID,
          email: "demo@example.com",
          name: "Demo User"
        }
      })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build where clause (use demo user)
    const where: any = { userId: DEFAULT_USER_ID }

    if (category) {
      where.category = category
    }

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate)
      if (endDate) where.date.lte = new Date(endDate)
    }

    // Get expenses with pagination
    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.expense.count({ where })

    return NextResponse.json({
      expenses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/expenses - Create new expense (no auth required)
export async function POST(request: NextRequest) {
  try {
    // Use demo user
    const DEFAULT_USER_ID = "demo-user"

    // Ensure demo user exists
    let user = await prisma.user.findUnique({
      where: { id: DEFAULT_USER_ID }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: DEFAULT_USER_ID,
          email: "demo@example.com",
          name: "Demo User"
        }
      })
    }

    const body = await request.json()

    // Validate required fields
    const { amount, currency, category, date, description, isRecurring, recurrence } = body

    if (!amount || !currency || !category || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, category, date' },
        { status: 400 }
      )
    }

    // Validate amount is a positive number
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number' },
        { status: 400 }
      )
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        currency,
        category,
        date: new Date(date),
        description: description || null,
        isRecurring: Boolean(isRecurring),
        recurrence: recurrence || null,
        userId: DEFAULT_USER_ID
      }
    })

    return NextResponse.json(expense, { status: 201 })

  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}