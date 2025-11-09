"use client";
import { useState, useEffect } from 'react'
import { Edit, Trash2, Search, Filter, Calendar, DollarSign, Tag } from 'lucide-react'
import ExpenseForm from './expense-form'

interface Expense {
  id: string
  amount: number
  currency: string
  category: string
  date: string
  description?: string
  isRecurring: boolean
  recurrence?: string
}

interface ExpenseListProps {
  onExpenseUpdate?: () => void
}

export default function ExpenseList({ onExpenseUpdate }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Filtering and pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Investments',
    'Savings',
    'Other'
  ]

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(selectedCategory && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      })

      const response = await fetch(`/api/expenses?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }

      const data = await response.json()
      setExpenses(data.expenses || [])
      setTotalPages(data.pagination?.pages || 1)
      setError(null)
    } catch (err) {
      setError('Failed to load expenses')
      console.error('Error fetching expenses:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [currentPage, selectedCategory, searchTerm])

  useEffect(() => {
    if (onExpenseUpdate) {
      onExpenseUpdate()
    }
  }, [expenses, onExpenseUpdate])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete expense')
      }

      await fetchExpenses()
    } catch (err) {
      setError('Failed to delete expense')
      console.error('Error deleting expense:', err)
    }
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const handleFormSubmit = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const url = editingExpense
        ? `/api/expenses/${editingExpense.id}`
        : '/api/expenses'

      const response = await fetch(url, {
        method: editingExpense ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingExpense ? 'update' : 'create'} expense`)
      }

      setShowForm(false)
      setEditingExpense(null)
      await fetchExpenses()
    } catch (err) {
      setError(`Failed to ${editingExpense ? 'update' : 'create'} expense`)
      console.error('Error submitting expense:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  if (showForm) {
    return (
      <ExpenseForm
        expense={editingExpense || undefined}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false)
          setEditingExpense(null)
        }}
        isLoading={false}
      />
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Expenses
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Expense
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading expenses...
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No expenses found. Add your first expense to get started!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Category
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Amount
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(expense.date)}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {expense.category}
                    </span>
                    {expense.isRecurring && (
                      <span className="ml-1 text-xs text-purple-600 dark:text-purple-400" title="Recurring">
                        ↻
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">
                    {expense.description || '-'}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                    {formatAmount(expense.amount, expense.currency)}
                  </td>
                  <td className="py-3 px-2 text-sm text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}