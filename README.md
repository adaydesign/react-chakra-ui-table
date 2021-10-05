# React ChakraUI Table

- npm : https://www.npmjs.com/package/react-chakra-ui-table

## Library
- React 17 (create by CRA)
- Chakra UI + Icons (main UI Library)
- React Table
- React Select
- React Icons

## Install

- install ChakraUI Library
- and install react-chakra-ui-table

```
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
npm i react-chakra-ui-table
```

## Example Code
- in App.js (don't use any .css files)

```
import { useState, useRef, useEffect } from 'react'
import { ChakraProvider,Text,Heading,Flex } from '@chakra-ui/react'
import { ChakraUITable } from 'react-chakra-ui-table'

// Example Table
const TodoListTable = () => {
  const columns = [
    {
      Header: '#',
      Cell: ({ row }) => (<Text>{row.index + 1}</Text>)
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Completed',
      accessor: 'completed',
      Cell: ({ value }) => (value ? '✅' : '❌')
    },
  ]

  const [data, setData] = useState(null)

  const loadData = useRef()
  loadData.current = async () => {
    const urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/todos']
    try {
      const result = await Promise.all(
        urls.map(url => fetch(url).then(r => r.json()))
      )

      if (result.length === 2) {
        // index 0 is user
        // index 1 is todo
        const todoList = result[1].map(todo => {
          todo.user = result[0].find(i => i.id === todo.userId)
          todo.name = todo.user?.name
          return todo
        })

        setData(todoList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData.current()
  }, [])

  return (
    data && <ChakraUITable columns={columns} data={data} />
  )
}

const App = () => {
  return (
    <ChakraProvider>
      <Flex p={6} direction="column">
      <Heading mb={4}>Demo using React ChakraUI Table via Vite App</Heading>
      <TodoListTable />
      </Flex>
    </ChakraProvider>
  )
}

export default App
```

## Demo
- demo : https://demo-chakraui-table.netlify.app/

