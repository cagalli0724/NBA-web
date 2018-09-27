import React from 'react';
import nba from 'nba';
import { AutoComplete, Input, Icon } from 'antd';
import {PROFILE_PIC_URL_PREFIX} from '../constants.js'
const Option = AutoComplete.Option

export class SearchBar extends React.Component {
 state = {
   dataSource: [],
 }

 handleSearch = (value) => {
   this.setState({
   //equal to function(player){return {fullName: player.fullName, playerId: player.playerId}}
     dataSource: !value ? [] : nba.searchPlayers(value).map(player => ({
        playerId:player.playerId,
        fullName: player.fullName
     })),
   });
 }

 onSelect = (name) => {
   this.props.handleSelectPlayer(name);
 }

 render() {
   const { dataSource } = this.state;
   const options = dataSource.map(player => (
    <Option key={player.fullName} text={player.fullName} className="player-option">
        <img src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} alt="Player" className="player-option-image"/>
        <span className="player-option-label">{player.fullName} </span>
    </Option>

   ))
   return (
     <AutoComplete
       className="search-bar"
       dataSource={options}
       size="large"
       onSelect={this.onSelect}
       onSearch={this.handleSearch}
       placeholder="Search NBA Player"
       optionLabelProp="value"
     >
       <Input suffix={<Icon type="search" className="certain-category-icon" />} />
     </AutoComplete>
   );
 }
}
