import type { Component } from 'solid-js'
import Search from './components/Search'

const App: Component = () => {
  return (
    <main class='flex flex-col items-center justify-center p-6'>
      <Search />
    </main>
  )
}

export default App
