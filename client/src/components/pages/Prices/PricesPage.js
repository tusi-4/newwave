import React from 'react';
import { Alert, Container } from 'reactstrap';

class Prices extends React.Component {
  componentDidMount(){
    const {loadConcerts} = this.props;
    loadConcerts();
  }

  render(){
    const {concerts} = this.props;
  
    return(
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
        
        <Alert color="info">
            Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        {concerts.map(concert => (
          <div key={concert._id}>
            <h2>{concert.performer}</h2>
            <p>Day: {concert.day}</p>
            <p>Price: {concert.price}</p>
            <p>Workshops:
              {concert.workshops.map(workshop => (
                <li key={workshop.name}>{workshop.name}</li>
              ))}
              </p>
              {console.log('WORKSHOPS: ', concert.workshops)}
          </div>
        ))}
            
      </Container>
    )
  }
}

/*
const Prices = () => (
  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    <h2>Day one</h2>
    <p>Price: 25$</p>
    <p>Workshops: "Rock Music Style", "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>
    <h2>Day Two</h2>
    <p>Price: 25$</p>
    <p>Workshops: "Find your real tune", "Find your real YOU", "Fell the music", "Jam session"</p>
    <h2>Day three</h2>
    <p>Price: 50$</p>
    <p>Workshops: "Increase your vocal range", "How to properly warmup before singing", "It's time for YOU!"</p>
  </Container>
);
*/

export default Prices;