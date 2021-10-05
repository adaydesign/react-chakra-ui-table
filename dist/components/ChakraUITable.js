"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTable = require("react-table");

var _react2 = require("@chakra-ui/react");

var _bs = require("react-icons/bs");

var _reactSelect = _interopRequireDefault(require("react-select"));

const _excluded = ["columns", "data", "options", "size", "variant"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const EmptyRow = _ref => {
  let {
    colSpan,
    text
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react2.Tr, {
    bgColor: (0, _react2.useColorModeValue)("gray.100", "gray.600")
  }, /*#__PURE__*/_react.default.createElement(_react2.Td, {
    colSpan: colSpan
  }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    w: "full",
    justify: "center",
    py: "100px"
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "sm"
  }, text || "ไม่พบข้อมูล"))));
};

const defaultOptions = {
  pageSizes: [10, 40, 100],
  text: {
    emptyText: 'no data',
    display: 'Display',
    rec: 'records',
    goto: 'Go to page'
  }
};

const ChakraUITable = _ref2 => {
  let {
    columns,
    data,
    options = defaultOptions,
    size = "sm",
    variant = "simple"
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, _excluded);

  // console.log('table')
  // console.log(data)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize
    }
  } = (0, _reactTable.useTable)({
    columns,
    data,
    initialState: {
      pageIndex: 0
    }
  }, _reactTable.usePagination);

  const countCols = () => {
    const hgLen = headerGroups.length;

    if (hgLen > 0) {
      return headerGroups[hgLen - 1].headers.length;
    }

    return 0;
  };

  const pageSelectOption = pageOptions.map(p => {
    return {
      value: p,
      label: p + 1
    };
  });
  return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    w: "full",
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_react2.Table, _extends({}, getTableProps(), {
    size: size,
    variant: variant
  }, rest), /*#__PURE__*/_react.default.createElement(_react2.Thead, null, headerGroups.map(headerGroup => /*#__PURE__*/_react.default.createElement(_react2.Tr, headerGroup.getHeaderGroupProps(), headerGroup.headers.map(column => /*#__PURE__*/_react.default.createElement(_react2.Th, column.getHeaderProps(), column.render('Header')))))), /*#__PURE__*/_react.default.createElement(_react2.Tbody, getTableBodyProps(), page === null || page === void 0 ? void 0 : page.map(row => {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement(_react2.Tr, _extends({}, row.getRowProps(), {
      _hover: variant === "simple" && {
        bgColor: "blue.50"
      }
    }), row.cells.map(cell => {
      return /*#__PURE__*/_react.default.createElement(_react2.Td, cell.getCellProps(), cell.render('Cell'));
    }));
  }), (page === null || page === void 0 ? void 0 : page.length) === 0 && /*#__PURE__*/_react.default.createElement(EmptyRow, {
    colSpan: countCols(),
    text: options.text.emptyText
  }))), /*#__PURE__*/_react.default.createElement(_react2.HStack, {
    mt: 3
  }, /*#__PURE__*/_react.default.createElement(_react2.Flex, null, /*#__PURE__*/_react.default.createElement(_react2.Select, {
    value: pageSize,
    onChange: e => {
      setPageSize(Number(e.target.value));
    }
  }, options.pageSizes.map(pageSize => /*#__PURE__*/_react.default.createElement("option", {
    key: pageSize,
    value: pageSize
  }, "".concat(options.text.display, " ").concat(pageSize, " ").concat(options.text.rec))))), /*#__PURE__*/_react.default.createElement(_react2.ButtonGroup, {
    isAttached: true
  }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    leftIcon: /*#__PURE__*/_react.default.createElement(_bs.BsChevronBarLeft, null),
    onClick: () => gotoPage(0),
    disabled: !canPreviousPage
  }), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    leftIcon: /*#__PURE__*/_react.default.createElement(_bs.BsChevronLeft, null),
    onClick: () => previousPage(),
    disabled: !canPreviousPage
  }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    align: "center",
    mx: 3
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, null, "\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48", /*#__PURE__*/_react.default.createElement(_react2.Text, {
    as: "strong",
    ml: 2
  }, pageIndex + 1, " / ", pageOptions === null || pageOptions === void 0 ? void 0 : pageOptions.length))), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    leftIcon: /*#__PURE__*/_react.default.createElement(_bs.BsChevronRight, null),
    onClick: () => nextPage(),
    disabled: !canNextPage
  }), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    leftIcon: /*#__PURE__*/_react.default.createElement(_bs.BsChevronBarRight, null),
    onClick: () => gotoPage(pageCount - 1),
    disabled: !canNextPage
  })), /*#__PURE__*/_react.default.createElement(_react2.Spacer, null), /*#__PURE__*/_react.default.createElement(_react2.Flex, null, /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.SimpleGrid, {
    columns: 2,
    alignItems: "center",
    w: "240px",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    display: "flex",
    justifyContent: "flex-end"
  }, options.text.goto), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    isClearable: true,
    value: {
      value: pageIndex,
      label: pageIndex + 1
    },
    onChange: e => {
      if (e) gotoPage(e.value);else gotoPage(0);
    },
    options: pageSelectOption
  }))))));
};

var _default = ChakraUITable;
exports.default = _default;