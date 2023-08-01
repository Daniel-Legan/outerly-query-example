import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MovieList = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );

            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };
        getUserLocation(); // Call the function after defining it.
    }, []);



    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // const handleSearch = () => {
    //     // Call the Google Places API to get recommended hiking locations
    //     // Pass the searchQuery and user's location to the API and handle the response

    //     // Replace 'YOUR_GOOGLE_API_KEY' with your actual Google API key
    //     let apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCzvaWz-QTXbCw05BBOO1bgK-t9I_fhcqs&query=${searchQuery}+hiking&type=establishment`;

    //     if (latitude && longitude) {
    //         apiUrl += `&location=${latitude},${longitude}&radius=5000`; // Adjust the radius as needed (in meters)
    //     }

    //     fetch(apiUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.results && data.results.length > 0) {
    //                 const recommendedLocations = data.results.slice(0, 10).map((result) => result.name);
    //                 onSearch(recommendedLocations); // Pass the list of recommended locations to the parent component
    //             } else {
    //                 onSearch([]); // No results found
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching recommended locations:', error);
    //             onSearch([]); // Error occurred or no results found
    //         });
    // };

    const handleSearch = () => {
        console.log(`lat: ${latitude}, lng: ${longitude}`);
        dispatch({
            type: 'FETCH_QUERY',
            payload: {
                latitude: latitude,
                longitude: longitude,
                searchQuery: searchQuery
            }
        });
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Enter your search phrase"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default MovieList;
