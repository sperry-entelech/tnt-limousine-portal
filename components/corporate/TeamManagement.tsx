'use client'

import React, { useState } from 'react'
import { CorporateAccount, CorporateUser } from '@/types'

interface TeamManagementProps {
  account: CorporateAccount
}

export default function TeamManagement({ account }: TeamManagementProps) {
  const [users, setUsers] = useState(account.users)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState<Partial<CorporateUser>>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
    permissions: ['book'],
    active: true
  })

  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full access to all features and settings',
      permissions: ['book', 'approve', 'manage_users', 'view_reports', 'manage_billing']
    },
    {
      id: 'approver',
      name: 'Approver',
      description: 'Can book trips and approve requests from other users',
      permissions: ['book', 'approve', 'view_reports']
    },
    {
      id: 'user',
      name: 'User',
      description: 'Can book trips (subject to approval settings)',
      permissions: ['book']
    }
  ]

  const permissionDescriptions = {
    book: 'Book transportation services',
    approve: 'Approve booking requests',
    manage_users: 'Add and manage team members',
    view_reports: 'Access analytics and reports',
    manage_billing: 'Manage billing and payment methods'
  }

  const addUser = () => {
    if (newUser.email && newUser.firstName && newUser.lastName) {
      const user: CorporateUser = {
        id: `user-${Date.now()}`,
        email: newUser.email!,
        firstName: newUser.firstName!,
        lastName: newUser.lastName!,
        role: newUser.role as 'admin' | 'user' | 'approver',
        permissions: newUser.permissions || ['book'],
        costCenter: newUser.costCenter,
        active: true
      }
      setUsers([...users, user])
      setNewUser({
        email: '',
        firstName: '',
        lastName: '',
        role: 'user',
        permissions: ['book'],
        active: true
      })
      setShowAddUser(false)
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ))
  }

  const updateUserRole = (userId: string, role: string) => {
    const selectedRole = roles.find(r => r.id === role)
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: role as 'admin' | 'user' | 'approver', permissions: selectedRole?.permissions || ['book'] }
        : user
    ))
  }

  const removeUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-tnt-red hover:bg-tnt-red-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Team Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.active).length}</p>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-sm text-gray-600">Administrators</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'approver').length}</p>
            <p className="text-sm text-gray-600">Approvers</p>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Add Team Member</h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => {
                    const selectedRole = roles.find(r => r.id === e.target.value)
                    setNewUser({ 
                      ...newUser, 
                      role: e.target.value as 'admin' | 'user' | 'approver',
                      permissions: selectedRole?.permissions || ['book']
                    })
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Center (Optional)
                </label>
                <input
                  type="text"
                  value={newUser.costCenter}
                  onChange={(e) => setNewUser({ ...newUser, costCenter: e.target.value })}
                  placeholder="e.g., Engineering, Sales, Marketing"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddUser(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="bg-tnt-red hover:bg-tnt-red-dark text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Center
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={!user.active ? 'opacity-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-tnt-red/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-tnt-red">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.costCenter || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          user.active
                            ? 'text-red-600 hover:text-red-800'
                            : 'text-green-600 hover:text-green-800'
                        } transition-colors`}
                      >
                        {user.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => removeUser(user.id)}
                        className="text-xs px-2 py-1 rounded text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Descriptions */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Role Permissions</h3>
        </div>
        <div className="p-6 space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {users.filter(u => u.role === role.id).length} user{users.filter(u => u.role === role.id).length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="text-xs bg-tnt-red/10 text-tnt-red px-2 py-1 rounded"
                    title={permissionDescriptions[permission as keyof typeof permissionDescriptions]}
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
