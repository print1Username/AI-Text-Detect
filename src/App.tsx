import './App.css'

import { Bot } from 'lucide-react';
import { ImageUp } from 'lucide-react';
import { Link } from 'lucide-react';

import ThemeToggle from './components/theme_toggle';
import Button from './components/button'

function App() {
  return (
    <>
      <Bot className='logo' size={125} />
      <h1>Text AI Detector</h1>

      <p>
        This is the AI Text detector website.
      </p>

      <Button >
        Upload Image <ImageUp />
      </Button >

      <Button >
        Image with link <Link/>
      </Button >

      <ThemeToggle />
    </>
  )
}

export default App
