import React from 'react'
import { useTable, usePagination } from 'react-table'
import {
    Flex, Table as ChakraTable, Tbody, Td, Text, Th, Thead, Tr,
    Button, ButtonGroup, Spacer, HStack, FormControl, Select, SimpleGrid, useColorModeValue as colorValue
} from '@chakra-ui/react'
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight } from "react-icons/bs";
import ReactSelect from 'react-select'

const EmptyRow = ({ colSpan, text }) => {
    return (
        <Tr bgColor={colorValue("gray.100", "gray.600")} >
            <Td colSpan={colSpan} >
                <Flex w="full" justify="center" py="100px">
                    <Text fontSize="sm">{text || "ไม่พบข้อมูล"}</Text>
                </Flex>
            </Td>
        </Tr>

    )
}

const defaultOptions = {
    pageSizes: [10, 40, 100],
    text: {
        emptyText: 'no data',
        display: 'Display',
        rec: 'records',
        goto: 'Go to page'
    }
}
const ChakraUITable = ({ columns, data, options = defaultOptions, size = "sm", variant = "simple", ...rest }) => {
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
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    const countCols = () => {
        const hgLen = headerGroups.length
        if (hgLen > 0) {
            return headerGroups[hgLen - 1].headers.length
        }
        return 0
    }

    const pageSelectOption = pageOptions.map(p => {
        return { value: p, label: p + 1 }
    })

    return (
        <Flex w="full" direction="column">
            <ChakraTable {...getTableProps()} size={size} variant={variant} {...rest}>
                <Thead>
                    {
                        headerGroups.map(headerGroup => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <Th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </Th>
                                    ))
                                }
                            </Tr>
                        ))
                    }
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {
                        page?.map(row => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()} _hover={variant === "simple" && { bgColor: "blue.50" }}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <Td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </Td>
                                            )
                                        })
                                    }
                                </Tr>
                            )
                        })
                    }
                    {page?.length === 0 && <EmptyRow colSpan={countCols()} text={options.text.emptyText} />}
                </Tbody>
            </ChakraTable>
            <HStack mt={3}>
                <Flex>
                    <Select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {options.pageSizes.map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {`${options.text.display} ${pageSize} ${options.text.rec}`}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <ButtonGroup isAttached>
                    <Button leftIcon={<BsChevronBarLeft />} onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                    <Button leftIcon={<BsChevronLeft />} onClick={() => previousPage()} disabled={!canPreviousPage} />
                    <Flex align="center" mx={3}>
                        <Text>
                            หน้าที่
                            <Text as="strong" ml={2}>
                                {pageIndex + 1} / {pageOptions?.length}
                            </Text>
                        </Text>
                    </Flex>
                    <Button leftIcon={<BsChevronRight />} onClick={() => nextPage()} disabled={!canNextPage} />
                    <Button leftIcon={<BsChevronBarRight />} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                </ButtonGroup>
                <Spacer />
                <Flex>
                    <FormControl>
                        <SimpleGrid columns={2} alignItems="center" w="240px" spacing={2}>
                            <Text display="flex" justifyContent="flex-end">{options.text.goto}</Text>
                            <ReactSelect
                                isClearable
                                value={{ value: pageIndex, label: pageIndex + 1 }}
                                onChange={e => {
                                    if (e) gotoPage(e.value)
                                    else gotoPage(0)
                                }}
                                options={pageSelectOption}
                            />
                        </SimpleGrid>
                    </FormControl>
                </Flex>
            </HStack>
        </Flex >
    )
}

export default ChakraUITable