'use client'

import { useEffect, useState } from 'react'
import { Main } from '@/components/layout/main'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { userListSchema } from './data/schema'

export default function Users() {
  const [userList, setUserList] = useState<any[]>([])

  useEffect(() => {
    // Dynamically import the users data only on the client-side
    import('./data/users').then((module) => {
      const userListData = userListSchema.parse(module.users)
      setUserList(userListData)
    })
  }, [])

  if (userList.length === 0) {
    return <div>Loading...</div> // Show loading state while data is being fetched
  }

  return (
    <UsersProvider>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
