class Team extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        shots: 0, 
        score: 0
      }

      this.shotSound = new Audio('./assets/audio/shot.mp3')
      this.scoreSound = new Audio('./assets/audio/sink.mp3')
      this.missSound = new Audio('./assets/audio/miss.mp3')
    }

  shotHandler = () => {
    let score = this.state.score
    this.shotSound.play()

    if(Math.random() < 0.5) {
      score += 1
      setTimeout(() => {
        this.scoreSound.play()
      }, 900)
      
    } else {
      setTimeout(() => {
        this.missSound.play()
      }, 900)
    }
    this.setState((state, props) => ({
      shots: this.state.shots + 1, 
      score
    }))
  }
  render() {
    let shotPercentageDiv
    if(this.state.shots){
      
    const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
        shotPercentageDiv = (
          <div>
          <strong>Shooting: </strong>{shotPercentage}%
        </div>
        )
    }
    return (
      <div className="Team">
        <h2> {this.props.name} </h2>
        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong> {this.state.shots} 
        </div>

        <div>
          <strong>Score:</strong> {this.state.score}
        </div>
        {shotPercentageDiv}

      <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    )
  }
}

function Game(props) {
  return (
    <div className='Game'>
    <h1>Welcome to {props.venue}</h1>
    <div className="stats">
    <Team 
    name={props.visitingTeam.name}
    logo={props.visitingTeam.logoSrc}
  />
  <div className="versus">
    <h1>VS</h1>
  </div>
  <Team 
    name={props.homeTeam.name}
    logo={props.homeTeam.logoSrc} 
  />
  </div>
  </div>
  )
}

function App(props){
  const raccoons = {
    name: 'Russiaville Raccoons',
    logoSrc: './assets/images/coon.jpg'
  }

  const squirrels = {
    name: 'Sheridan Squirrels',
    logoSrc: './assets/images/squirell.png'
  }
  return (
    <div className="App">>
      <Game 
        venue='Union 525 Gem'
        homeTeam = {squirrels}
        visitingTeam={raccoons}
      />
      <Game 
        venue='Sheridan Squirrels'
        homeTeam = {squirrels}
        visitingTeam={raccoons}
      />
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);