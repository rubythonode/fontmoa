
import React, { Component } from 'react';
import './default.css';

import common from '../../../util/common'

class FontList extends Component {

    constructor () {
        super()

        this.state = {
            selectedFont : {}
        }
    }

    onClickFontItem = (font) => {
        return () => {
            this.setState({
                selectedFont : font 
            })
            this.props.refreshGlyf(font);
        }
    }

    createFontNames = (font) => {
        return (
            <ul className="font-tree-node child submenu">
            {font.files.map((f, index) => {
                const style = {
                    fontFamily: common.getFontFamilyCollect(f)
                };
                
                if (f.italic) {
                    style.fontStyle = 'italic';
                }

                if (f.bold) {
                    style.fontWeight = 'bold'
                } else {
                    style.fontWeight = 'normal'
                }

                let className = "";

                if (this.state.selectedFont.item && this.state.selectedFont.item.path === f.item.path ) {
                    className += " active";
                }

                return (
                    <li className={className} key={index} onClick={this.onClickFontItem(f, index)}><a style={style}> {f.currentFamilyName} </a></li>
                )
            })}
            </ul>
        )
    }

    createFontList = (font, index) => {
        return (
            <div className="font-tree-item vmenu flat" key={index}>
                <a className="font-tree-node parent">{font.name}</a>
                {this.createFontNames(font)}
            </div>
        )
    }

    render() {
        return (
            <div className="font-tree">
                {this.props.fontTree.map((font, index) => {
                    return this.createFontList(font, index)
                })}
            </div>
        )
    }
}

export default FontList 