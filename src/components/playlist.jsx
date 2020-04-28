import React from 'react';

export default function Playlists(props) {
    const { playlists } = props;
    return (
        <div className="text-left">
            <h4>My playlists</h4>
            <div className="my-playlist">
                {playlists && playlists.length === 0 &&
                    <div>
                        Go to <a href="https://open.spotify.com" target="_blank"> my accout </a> to create one.
                    </div>

                }
                {playlists &&
                    playlists.map(playlist => {
                        return (
                            <div key={playlist.id} className="playlist">
                                {playlist.name}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}