import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from './components/Spinner'

const App = () => {
  const[coins,setCoins]=useState([])
  const [isloading,setIsLoading]=useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params:{
              vs_currency:'usd',
              order:'market_cap_desc',
              per_page:10,
              page:1,
              sparkLine:false,
            }
          }
        )
        setCoins(res.data)
      }catch(error){
        console.error('Error fetching data',error)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  },[])

  return (
    <div className='min-h-screen bg-gray-900 text-white flex items-center 
    justify-center px-6 py-10 '>
      <div className="w-full max-w-5xl">
        <h1 className="text-xl tracking-[3px] mb-8 text-uppercase text-gray-300">
          <span className="text-5xl">C</span>ryptocurrency Market
        </h1> 
        {isloading ? (
          <Spinner />
        ):(
          <div className="overflow-x-auto">
          <table className="min-w-full border border-white/20 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from indigo-500 to-pink-500">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price (USD)</th>
                <th className="px-4 py-2 text-left">Market Cap</th>
                <th className="px-4 py-2 text-left">24hour Change</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin,index)=>(
              <tr key={coin.id} className="border-t border-gray-600 bg-gray-800 hover:bg:white/10">
                <td className="px-4 py-2">{index+1}</td>
                <td className="px-4 py-2 flex items-center gsap-2">
                  <img src={coin.image}
                  className='w-6 h-6'
                  alt="Bitcoin" />
                  
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2">$820,000,000,000</td>
                <td className="px-4 py-2 text-green-400">+2.5%</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  )
}

export default App
