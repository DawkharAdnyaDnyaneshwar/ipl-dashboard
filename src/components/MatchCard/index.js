import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p
        className={`match-status {matchStatus === 'Won' ? 'match-won' : 'match-lost'}`}
      >
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
