import intl from 'react-intl-universal'
import React, { Component } from 'react';
import './default.css';

import common from '../../../util/common'

const FileItem = (props) => {
    const contentstyle = props.contentstyle;
    const font = props.font;
    const item = font.item; 

    const style = Object.assign({}, font.collectStyle);

    const isGrid = contentstyle === 'grid';

    let message = props.fontStyle.content || common.getPangramMessage(font.currentLanguage, isGrid); 

    return (
        <div draggable={true} className="font-item" data-dir={item.dir} data-path={item.path}>
            <div className="font-info">
                <div className="font-family" title={font.subfamilyName}>{font.currentFamilyName}<span className="font-sub-family">({font.subfamilyName})</span></div>
                <div className="font-name">{item.name}</div>
            </div>
            <div className="font-item-preview" style={style}>{message}</div>
        </div>        
    )
}

class FontListView extends Component {

    constructor (props) {
        super(props);

        this.state = {
            selectedRow: false, 
            fontListContentStyle : 'grid'
        }
    }

    handleFontClick = (e) => {
        const path = e.target.getAttribute('data-path')
        console.log(path)
    }

    selectFontClick = (e) => {

        [...document.querySelectorAll('.font-list-view .font-item.selected')].forEach((node) => {
            node.classList.remove('selected');  
        });

        e.target.classList.add('selected');

        const path = e.target.getAttribute('data-path');

        this.props.refreshFontInfo(path);
    }

    handleTabClick = (e) => {
        

        let href = e.target.getAttribute('href');

        if (!href) {
            href = e.target.querySelector("a").getAttribute("href");
        }
        const id = href.split('#').pop();

        this.setState({
            selectedRow: id === "row",
            fontListContentStyle: id || "grid"
        })
    }

    refreshFontSize (fontSize) {
        this.refs.fontListContent.style.fontSize = fontSize;
    }

    refreshFontCont (content) {
        if (content) {
            const nodes = this.refs.fontListContent.querySelectorAll(".font-item-preview");

            if (nodes) {
                [...nodes].forEach((el) => {
                    el.textContent = content; 
                })
            }

        }

    }

    render() {

        const fontStyle = {
            fontSize : this.props.fontStyle.fontSize,
            content : this.props.fontStyle.content,
        }

        const colorStyle = Object.assign({
            color: this.props.fontStyle.color,
            backgroundColor: this.props.fontStyle.backgroundColor,
        }, fontStyle);

        return (
            <div className="font-list-view">
                <div className="font-list-header" >
                    <div className="title">{intl.get('fontmanager.fontlistview.header.title')} {this.props.directory} : {this.props.files.length}</div>
                    <div className="tools">
                        <ul className="pill" onClick={this.handleTabClick}>
                            <li className={this.state.selectedRow ? 'active' : ''}><a href="#row"><i className="icon icon-menu"></i></a></li>
                            <li className={this.state.selectedRow ? '' : 'active'}><a href="#grid"><i className="icon icon-list1"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div ref="fontListContent" className="font-list-content" style={colorStyle} data-content-style={this.state.fontListContentStyle} onDoubleClick={this.handleFontClick} onClick={this.selectFontClick}>
                    {this.props.files.map((it, i) => {
                        return <FileItem font={it} key={i} index={i} fontStyle={fontStyle} contentstyle={this.state.fontListContentStyle} />
                    })}
                </div>
            </div>
        )
    }
}

export default FontListView 