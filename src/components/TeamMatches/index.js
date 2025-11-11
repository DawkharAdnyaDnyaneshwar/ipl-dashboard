import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamDetails: {}, isLoading: true}

  componentDidMount() {
    this.getTeamDetails()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingteamLogo: data.competing_team_logo,
    firstInnings: data.first_inning,
    secondInning: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({teamDetails: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, teamDetails} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamDetails
    const {match} = this.props
    const {params} = match
    const {id} = params
    const classname = id.toLowerCase()

    return (
      <div className={`team-matches-container ${classname}`}>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="responsive-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(eachmatch => (
                <MatchCard key={eachmatch.id} matchDetails={eachmatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
