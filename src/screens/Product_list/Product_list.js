
import React, { useState, useEffect } from "react";
import { Stack, Box, Grid, Typography, IconButton, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Container from "screens/container";
import { DataList } from '../childs';
import * as Api from "shared/services";
import { SearchInput, ToggleButtons } from "components";
import { Add as AddBoxIcon } from '@mui/icons-material';

const Component = (props) => {
    const { title } = props;
    const theme = useTheme();
    const [initialize, setInitialize] = useState(false);
    const [pageInfo, setPageInfo] = useState({ page: 0, pageSize: 5 });
    const [rowsCount, setRowsCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [searchStr, setSearchStr] = useState("");

    const NavigateTo = useNavigate();

    const OnSearchChanged = (e) => { setSearchStr(e); }

    const OnPageClicked = (e) => { setPageInfo({ page: 0, pageSize: 5 }); if (e) setPageInfo(e); }



    const FetchResults = async () => {
        setRows([]);
        setRowsCount(0);

        let _rows = [];


        global.Busy(true);

        await Api.GetProductsMulti(null, "MainImage").then(async (resP) => {
            if (resP.status) {
                for (let i = 0; i < resP.values.length; i++) {
                    let _Product = resP.values[i];
                    let _row = {
                        Product_Id: _Product.Product_id,
                        Name: _Product.Name,
                        Size: _Product.Size,
                        Product_Description: _Product.Product_description,
                        Product_Type: _Product.PType,
                        Product_Price: _Product.PrPrice,
                        UOM: _Product.UnitOfMeasurement,
                    };

                    _Product.MainImage &&
                        await Api.GetDocumentSingle(_Product.MainImage.DocId, true, _Product.MainImage.DocType).then((resI) => {
                            _row = { ..._row, mainImage: resI.values };
                        })

                    _rows.push(_row);
                }
            }
        });

        console.log(_rows)
        setRows(_rows);
        setRowsCount(_rows.length);
        global.Busy(false);
    }


    if (initialize) { setInitialize(false); FetchResults(); }

    useEffect(() => { setInitialize(true); }, []);

    return (

        <>
            <Container {...props}>
                <Box style={{ width: '100%', paddingBottom: 5 }}>
                    <Typography noWrap variant="subheader" component="div">
                        {title}
                    </Typography>
                    <Stack direction="row">
                        <Grid container sx={{ justifyContent: 'flex-end' }}>
                            <SearchInput searchStr={searchStr} onSearchChanged={OnSearchChanged} />
                            <IconButton
                                size="medium"
                                edge="start"
                                color="inherit"
                                aria-label="Add"
                                sx={{
                                    marginLeft: "2px",
                                    borderRadius: "4px",
                                    border: theme.borderBottom
                                }}
                                onClick={() => NavigateTo("/Products/create")}
                            >
                                <AddBoxIcon />
                            </IconButton>
                        </Grid>
                    </Stack>
                </Box>
                <Box style={{ width: '100%' }}>
                    <DataList rowsCount={rowsCount} rows={rows} pageInfo={pageInfo} onPageClicked={OnPageClicked} />
                </Box>
            </Container>
        </>

    );

};

export default Component;