import React, { useState } from 'react';
import axios from 'axios';

const AWBTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    console.log(trackingNumber)
    try {
      const response = await axios.post(
        'https://api.aftership.com/v4/trackings',
        {
          tracking: {
            tracking_number: trackingNumber,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'aftership-api-key': 'asat_5921ebb5c77e4a3e884c55eca4fe4655', // Replace with your actual API key
          },
        }
      );
      setTrackingInfo(response.data.data.tracking);
      setError(null);
    } catch (err) {
      setError('Tracking not found or API request failed.');
      setTrackingInfo(null);
    }
  };

  return (
    <div>
      <h2>AWB Tracking</h2>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter AWB Number"
      />
      <button onClick={handleTrack}>Track</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {trackingInfo && (
        <div>
          <h3>Tracking Information</h3>
          <p>Status: {trackingInfo.tag}</p>
          <p>Courier: {trackingInfo.slug}</p>
          <p>Tracking Number: {trackingInfo.tracking_number}</p>
          <p>Checkpoints:</p>
          <ul>
            {trackingInfo.checkpoints.map((checkpoint, index) => (
              <li key={index}>
                {checkpoint.location} - {checkpoint.message} on{' '}
                {checkpoint.checkpoint_time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AWBTracking;