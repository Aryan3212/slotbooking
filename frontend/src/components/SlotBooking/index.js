import { React, useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledSlotBooking = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  overflow: none;
  & > * {
    width: 40%;
    flex-basis: 1 1 auto;
  }
  .booked {
    .card-container {
      .card {
        padding: 10px;
        border: 1px solid #ccc;
        font-size: 1.2rem;
      }
    }
  }
  .datepicker {
    display: flex;
    flex-direction: column;
    padding-inline: 1rem;
    border: 2px solid #333;
    background-color: #eee;
    & > form {
      display: flex;
      flex-direction: column;
      input {
        margin-block: 1rem;
        padding: 0.5rem;
      }
      button {
        padding-inline: 0.5rem;
        padding-block: 0.75rem;
      }
    }
  }
`
const StyledHeader = styled.h3`
  text-align: left;
  color: #2E5EAA;
  font-size: 1.5rem;
`;
function SlotBooking() {
  const [data, setData] = useState([])
  const [returnedData, setReturnedData] = useState(null)
  useEffect(() => {
    fetch('http://localhost:8080')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        console.log('Error occurred')
      })
  }, [])
  const submitForm = (e) => {
    e.preventDefault()
    const { start, end } = e.target
    const startTimestamp = new Date(start.value).toISOString()
    const endTimestamp = new Date(end.value).toISOString()
    const body = { start: startTimestamp, end: endTimestamp }
    fetch('http://localhost:8080/confirm_slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setReturnedData(data)
      })
  }
  return (
    <>
      {returnedData ? (
        <StyledHeader>
          Your slot details are <br/>ID: {returnedData.id}<br/>Start:{' '}
          {returnedData.start}<br/>End: {returnedData.end}
        </StyledHeader>
      ) : (
        ''
      )}
      <StyledSlotBooking>
        <div className="booked">
          <h2>Booked Slots</h2>
          <div className="card-container">
            {data.map(({ id, start, end }) => (
              <div key={id} className="card">
                <p key={start}>Start: {new Date(start).toLocaleString()}</p>
                <p key={end}>End: {new Date(end).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="datepicker">
          <h2>Slot Booking Form</h2>
          <form onSubmit={submitForm} method="POST">
            <label htmlFor="start">Start</label>
            <input type="datetime-local" name="start" />
            <label htmlFor="end">End</label>
            <input type="datetime-local" name="end" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </StyledSlotBooking>
    </>
  )
}

export default SlotBooking
