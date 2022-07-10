export const funcs = {
  SUM: {
    label: 'Sum',
    returnType: 'number',
    jsonLogic: ({ val, val2 }) => ({
      '+': [val, val2]
    }),
    renderBrackets: [''],
    renderSeps: ['+'],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Value 2',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  SUBTRACTION: {
    label: 'Subtraction',
    returnType: 'number',
    jsonLogic: ({ val, val2 }) => ({
      '-': [val, val2]
    }),
    renderBrackets: [''],
    renderSeps: ['-'],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Value 2',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  MULTIPLICATION: {
    label: 'Multiplication',
    returnType: 'number',
    jsonLogic: ({ val, val2 }) => ({
      '*': [val, val2]
    }),
    renderBrackets: [''],
    renderSeps: ['*'],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Value 2',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  DIVISION: {
    label: 'Division',
    returnType: 'number',
    jsonLogic: ({ val, val2 }) => ({
      '/': [val, val2]
    }),
    renderBrackets: [''],
    renderSeps: ['/'],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Value 2',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  MODULO: {
    label: 'Modulo',
    returnType: 'number',
    jsonLogic: ({ val, val2 }) => ({
      '%': [val, val2]
    }),
    renderBrackets: [''],
    renderSeps: ['%'],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Value 2',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  MIN: {
    label: 'Min',
    returnType: 'number',
    jsonLogic: ({ val }) => ({
      min: [val]
    }),
    renderBrackets: [''],
    renderSeps: [''],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  MAX: {
    label: 'Max',
    returnType: 'number',
    jsonLogic: ({ val }) => ({
      max: [val]
    }),
    renderBrackets: [''],
    renderSeps: [''],
    args: {
      val: {
        label: 'Value',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },

  /*************************************************************************** */
  /*                    STRING OPERATIONS                                      */
  /*************************************************************************** */
  CONCAT: {
    label: 'Concat',
    returnType: 'text',
    jsonLogic: ({ val, val2 }) => ({
      cat: [val, val2]
    }),
    args: {
      val: {
        label: 'String 1',
        type: 'text',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'String 2',
        type: 'text',
        valueSources: ['value', 'field']
      }
    }
  },
  IN: {
    label: 'In',
    returnType: 'text',
    jsonLogic: ({ val, val2 }) => ({
      in: [val, val2]
    }),
    args: {
      val: {
        label: 'String 1',
        type: 'text',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'String 2',
        type: 'text',
        valueSources: ['value', 'field']
      }
    }
  },
  SUBSTRING: {
    label: 'Substring',
    returnType: 'text',
    jsonLogic: ({ val, val2 }) => ({
      substr: [val, val2]
    }),
    args: {
      val: {
        label: 'String 1',
        type: 'text',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Number',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  },
  SUBSTRING_LONG: {
    label: 'Substring 2',
    returnType: 'text',
    jsonLogic: ({ val, val2, val3 }) => ({
      substr: [val, val2, val3]
    }),
    args: {
      val: {
        label: 'String 1',
        type: 'text',
        valueSources: ['value', 'field']
      },
      val2: {
        label: 'Number',
        type: 'number',
        valueSources: ['value', 'field']
      },
      val3: {
        label: 'Number',
        type: 'number',
        valueSources: ['value', 'field']
      }
    }
  }
}
