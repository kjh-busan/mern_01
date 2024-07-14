import React from 'react'
import ReactPlayer from 'react-player'
import image from '../../imgs/SUYIIAPZFTQR3PKLAWUZDQGQI4.avif'

const CenteredImage: React.FC = () => {
    return (
        <div className="centered-content">
            <div className="responsive-media">
                <ReactPlayer
                    url="https://youtu.be/Rj7N4ThLGQY?si=0Hs6QedUq90JwnzH"
                    className="react-player"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="responsive-media">
                <img src={image} alt="Centered" className="responsive-image" />
            </div>
        </div>
    )
}

export default CenteredImage
