import Quill from 'quill';

const keyboardBindings = {
  // Ctrl/Cmd + 1 → H1 toggle
  header1: {
    key: '1',
    shortKey: true,
    handler(range) {
      const current = this.quill.getFormat(range).header;
      this.quill.format(
        'header',
        current === 1 ? null : 1,
        Quill.sources.USER
      );
    }
  },

  // Ctrl/Cmd + 2 → H2 toggle
  header2: {
    key: '2',
    shortKey: true,
    handler(range) {
      const current = this.quill.getFormat(range).header;
      this.quill.format(
        'header',
        current === 2 ? null : 2,
        Quill.sources.USER
      );
    }
  },

  // Ctrl + T → insert table
  tableBetter: {
    key: 't',
    ctrlKey: true,
    handler() {
      const tableModule = this.quill.getModule('table-better');
      tableModule.insertTable(2, 2);
    }
  },

  // Ctrl + - → insert divider (HR)
  divider: {
    key: '-',
    ctrlKey: true,
    handler(range) {
      this.quill.insertEmbed(
        range.index,
        'divider',
        true,
        Quill.sources.USER
      );
      this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
  },

  // Ctrl + B → toggle code block
  codeBlock: {
    key: 'b',
    ctrlKey: true,
    handler(range) {
      const formats = this.quill.getFormat(range);
      const isCode = Boolean(formats['code-block']);

      this.quill.format(
        'code-block',
        !isCode,
        Quill.sources.USER
      );
    }
  }
};

export default keyboardBindings;