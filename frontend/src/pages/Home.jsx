import {useState} from 'react'
import HomeFrontend from '../components/HomeFrontend'
import HomeBackend from '../components/HomeBackend'


const Home = () => {

  const [useBackend, setUseBackend] = useState(false)
  return (
<div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setUseBackend(!useBackend)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Switch to {useBackend ? "Frontend Demo" : "Backend Data"}
        </button>
      </div>

      {useBackend ? <HomeBackend /> : <HomeFrontend />}
    </div>
  )
}

export default Home
