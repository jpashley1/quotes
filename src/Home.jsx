import { useNavigate } from 'react-router-dom'


export function Home() {

const navigate = useNavigate();

const goToQuotes = () => {
  navigate('/quotes')
}

  return (
    <div>
      <h1>GET FANTASTIC QUOTES</h1>
      <button onClick={goToQuotes}>CLICK HERE !!!! FOR MIND BLOWING QUOTES !!!! CLICK HERE </button>
    </div>
  )
}