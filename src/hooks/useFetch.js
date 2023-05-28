// import { useEffect, useState } from 'react'

// const useFetch = url => {
//   const [data, setData] = useState(null)
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)

//       try {
//         const res = await fetch(url)
//         const json = await res.json()

//         setData(json)
//         setLoading(false)
//       } catch (error) {
//         setError(error)
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [url])

//   return { loading, error, data }
// }

// export default useFetch

import { useEffect, useState } from 'react'

const useFetch = url => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url)
        const json = await res.json()

        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  const createResource = async resourceData => {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resourceData)
      })

      const json = await response.json()

      setData(json)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const updateResource = async (resourceId, updatedData) => {
    setLoading(true)

    try {
      const response = await fetch(`${url}/${resourceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })

      const json = await response.json()

      setData(json)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const deleteResource = async resourceId => {
    setLoading(true)

    try {
      await fetch(`${url}/${resourceId}`, {
        method: 'DELETE'
      })

      setData(null)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    data,
    createResource,
    updateResource,
    deleteResource
  }
}

export default useFetch
