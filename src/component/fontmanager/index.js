import intl from 'react-intl-universal'

import React, { Component } from 'react';
import './default.css';

import {Tabs, TabItem} from '../../jui'

import Category from './category'
import FontListView from './fontlistview'
import FontInfo from './fontinfo'
import Menubar from './menubar'

import fontdb  from '../../util/fontdb'
import common  from '../../util/common'


class FontManager extends Component {

  constructor () {
    super();

    this.state = { 
      files : [], 
      systemFolders: common.getSystemFolders(),
      userFolders: [], 
      favorite : [],
      library : [],
      font :{},
      style: {
        fontSize: '40px'
      } 
    }
  }

  setActive = (id) => {
    this.refs.tabItem.setActive(id);
  }

  refreshFiles = (files) => {
    this.refs.fontlistview.refreshFiles(files);
  }

  updateFontInfo = (path) => {
     fontdb.findOne(path, (font) => {
      //this.setState({ font })
      this.refs.fontInfo.updateFontInfo(font);
    })
  }

  refreshFontView = (style) => {
    this.setState({ style })
  }

  refreshFontSize = (fontSize) => {
    this.refs.fontlistview.refreshFontSize(fontSize);
  }

  refreshFontContent = (content) => {
    this.refs.fontlistview.refreshFontCont(content);
  }

  toggleFavorite = (path, isAdd) => {
    this.refs.category.toggleFavorite(path, isAdd);
  }

  render() {
    return (
        <TabItem ref="tabItem" id={this.props.id}  active={this.props.mini !== true && this.props.active}>
            <div className="app-menu">
                <Menubar refreshFontStyle={this.refreshFontView} refreshFontSize={this.refreshFontSize} refreshFontContent={this.refreshFontContent} />
            </div>
            <div className="app-sidebar">
                <Tabs full={true} >
                    <TabItem id="category" title={intl.get('fontmanager.category.directory.title')} active={true}>
                        <Category ref="category" refreshFiles={this.refreshFiles} />
                    </TabItem>
                    <TabItem id="fontinfo" title={intl.get('fontmanager.category.fontinfo.title')}>
                        <FontInfo ref="fontInfo" />
                    </TabItem>
                </Tabs>
            </div>
            <div className="app-content">
                <FontListView ref="fontlistview" toggleFavorite={this.toggleFavorite} fontStyle={this.state.style} files={this.state.files} refreshFontInfo={this.updateFontInfo} />
            </div>
        </TabItem>
    );
  }
}

export default FontManager;
