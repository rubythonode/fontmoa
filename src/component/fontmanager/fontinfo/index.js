import intl from 'react-intl-universal'
import React, { Component } from 'react';
import './default.css';

const filesize = window.require('filesize');

class FontInfo extends Component {

    fieldList = [
        { key : "license", },                
        { key : "licenseURL",  },        
        { key : "copyright", },        
        { key : "manufacturer", },        
        { key : "vendorURL",  },        
        { key : "version",  },
        { key : 'trademark', },
        { key : "language", },
    ]

    constructor(props) {
        super(props);
        this.state = {
            font : {}
        }
    }

    convertContent = (obj) => {
        if (typeof obj.content !== 'string') {
            const list = Object.keys(obj.content).map((key) => {
                return obj.content[key];
            })

            obj.content = new Buffer(list, 'utf8').toString().replace(/\0/g, '');
        }
    }

    getViewInfo (font) {

        let list = [];

        
        if (font && Object.keys(font).length) {
            const size = filesize.partial({ round: 1, spacer: "" });
            const lang = font.currentLanguage;            

            this.fieldList.forEach((field) => {
                const fieldKey = "fontmanager.fontinfo.fields."+field.key+".title";
                if (font.name && font.name[field.key] && font.name[field.key][lang]) { 
                    let obj = { title : intl.get(fieldKey), content : font.name[field.key][lang], key : field.key };

                    this.convertContent(obj);

                    list.push(obj)
                } else if (font[field.key]) {
                    const content = Array.isArray(font[field.key]) ? font[field.key].join(', ') : font[field.key];
                    let obj = { title : intl.get(fieldKey), content : content, key : field.key };
                    
                    this.convertContent(obj);

                    list.push(obj)
                }
            })

            list.push({ title : intl.get("fontmanager.fontinfo.fields.name.title"), content : font.item.name })

            if (font.size) {
                list.push({ title : intl.get("fontmanager.fontinfo.fields.size.title"), content : size(font.size) })
            }            
        }

        return list; 
    }

    onClickNoteItem = (e) => {
        
    }

    updateFontInfo = (font) => {
        this.setState({ font })
    }

    render() {

        const font = this.props.font || this.state.font;

        const viewInfo = this.getViewInfo(font);

        return (
            <div className="font-note">
                {viewInfo.map((it, i) => {
                    const key = (it.key || "").toLowerCase();

                    let activeClass = "";
                    let attrs = { }

                    if (key === 'copyright') {
                        activeClass = "active";
                    } else if (key === 'license') {
                        activeClass = "active";
                    } else if (key === 'url' || key === 'licenseurl') {
                        attrs.href =  it.content; 
                        attrs.target =  "_blank"; 
                    }

                    return (
                        <div className="file-note-item vmenu flat" key={i} onClick={this.onClickNoteItem}>
                            <a className={activeClass}>{it.title}</a>
                            <ul className="submenu"><li ><a {...attrs} >{it.content}</a></li></ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default FontInfo 