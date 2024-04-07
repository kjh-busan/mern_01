import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Movie 타입 정의
type Movie = {
    _id: string
    title: string
    fullplot: string
    year: number
    genres: string[]
    runtime: number
    cast: string[]
    // 필요한 다른 필드들...
}

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        // '/api/movies' 엔드포인트에서 영화 데이터를 가져오되, 최대 10개만 요청한다
        const fetchMovies = async () => {
            try {
                const response = await axios.get<Movie[]>(
                    'http://localhost:5001/api/movies',
                    {
                        params: {
                            limit: 10, // 10개의 영화 데이터만 요청
                        },
                    }
                )
                setMovies(response.data) // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }

        fetchMovies()
    }, []) // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        {movie.title} - {movie.year} - {movie.genres.join(', ')}
                        <br />
                        Cast: {movie.cast.join(', ')}
                        <br />
                        Plot: {movie.fullplot}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
