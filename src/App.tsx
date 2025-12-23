import './App.css'

import { ImageUp } from 'lucide-react';
import { Link } from 'lucide-react';

import ThemeToggle from './components/theme_toggle';

function App() {
  return (
    <>
      <h1>Text AI Detector</h1>

      <p>
        This is the AI Text detector website.
      </p>

      <button>
        Upload Image <ImageUp />
      </button>

      <button>
        Image with link <Link/>
      </button>

      <ThemeToggle />
    </>
  )
}

export default App
