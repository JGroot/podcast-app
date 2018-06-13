import React, { Component } from 'react'
import { actions, connect } from 'mirrorx'
import styled from 'styled-components'

import Episode from './Episode/'
import EpisodeTitle from './Episode/EpisodeTitle'
import PodcastTitle from './Episode/PodcastTitle'
import AddToPlaylistButton from './Episode/AddToPlaylistButton'

export class SearchResults extends Component {
  componentWillMount () {
    const query = this.props.match.params.query
    actions.search.updateSearchTerm(query)
    actions.search.search(query)
  }

  render () {
    const {
      className,
      results,
      playlist,
      nowPlaying,
      currentSearch
    } = this.props

    return <div
      className={className}
      onClick={event => {
        if (event.target.nodeName !== 'DIV') return
        actions.search.clearSearch()
      }}
    >
      <b>{`${results.length} results for "${currentSearch}"`}</b>
      {
        results.length === 0
          ? <p id='noResults'>No results were found. Please try again.</p>
          : results.map(episode =>
            <Episode
              onClick={() => actions.player.play(episode)}
              key={episode.id}
              playing={episode.audioUrl === nowPlaying.audioUrl}
            >
              <EpisodeTitle>{episode.episodeTitle}</EpisodeTitle>
              <PodcastTitle>{episode.podcastTitle}</PodcastTitle>
              <AddToPlaylistButton
                added={playlist.some(item => item.audioUrl === episode.audioUrl)}
                onClick={event => {
                  event.stopPropagation()
                  actions.player.addToPlaylist(episode)
                }}
              />
            </Episode>
          )
      }
    </div>
  }
}

SearchResults.defaultProps = {
  results: [],
  playlist: [],
  nowPlaying: {},
  currentSearch: ''
}

export const ConnectedSearchResults = connect(state => ({
  nowPlaying: state.player.nowPlaying,
  results: state.search.results,
  playlist: state.player.playlist,
  currentSearch: state.search.currentSearch
}))(SearchResults)

export default styled(ConnectedSearchResults)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  padding: 80px 10% 130px 10%;

  background: rgba(255, 255, 255, 0.8);
  list-style: none;

  #noResults {
    margin-top: 100px;
    text-align: center;
    font-size: 1.2rem;
  }

  #closeButton {
    position: absolute;
    top: 8vh;
    right: 2vw;

    font-size: 2rem;
    background: none;
    border: none;
  }
`
