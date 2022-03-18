export const environment = {
  production: true,
    editorConfig:
    { toolbarGroups: [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks',  'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        ],
        removeButtons: 'Source,Save,Templates,Cut,Find,SelectAll,Scayt,Form,Checkbox,Radio,Replace,Copy,NewPage,Preview,Print,Paste,PasteText,PasteFromWord,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About',
        format_tags: 'h1;h2;h3;p',
        entities_latin: false,
        coreStyles_bold: { element: 'b', overrides: 'strong' },
        coreStyles_italic: { element: 'i', overrides: 'em' },
        htmlEncodeOutput: false,
        entities: false,
        basicEntities: false,
        removePlugins: 'pastefromword',
        breakAfterClose: false
    }
};
