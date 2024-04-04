
import { useEffect, useState } from "react";
import { Typography, Grid, Stack, Button, Box, Divider } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon, Edit as EditIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Container from "screens/container";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "shared/services";
import { GetMetaDataInfo } from "shared/common";
import ProductJsonConfig from "config/Product_detail_config.json";
import RenderFormContols from "./child/formcontrols";
import Helper from "shared/helper";

const Component = (props) => {
    const { title } = props;
    const theme = useTheme();
    const NavigateTo = useNavigate();
    const { id } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [row, setRow] = useState({});
    const [dropDownOptions, setDropDownOptions] = useState([]);

    const FetchProductDetails = async (enums) => {

        let item = {}, tmp;


        ['product','document'].forEach(elm => {
            let items = [];
            for (let prop of ProductJsonConfig[elm]) {
                items.push({ ...prop, value: null });
            }
            item[elm] = items;
        });

        if (id) {
                                    let rslt = await Api.GetProductSingle(id, "$expand=MainImag");
 
            const product = rslt.values;
            if (rslt.status) {

                const product = rslt.values;

                for (let prop in product) {
                    const tItem = item['product'].find((x) => x.key === prop);
                    if (tItem) {
                        item['product'].find((x) => x.key === prop).value = product[prop];
                    }
                }

                                                        
                        
                                        // Get Product MainImage
                    if (product.MainImage) {
                        tmp = {};
                        ['DocData', 'DocId', 'DocName', 'DocType', 'DocExt'].forEach((x) => {
                            tmp[x] = product.MainImage[x]
                        });

                        if (tmp.DocId > 0) {
                            rslt = await GetDocument(tmp.DocId, true, tmp.DocType);
                            if (rslt.status) tmp['DocData'] = rslt.values;
                        }
                        item['product'].find((x) => x.key === "MainImage").value = tmp;
                    }

            setRow(item);
            global.Busy(false);
        }
    }
    }

    const FetchMetaDataInfo = async () => {
        return new Promise(async (resolve) => {
            global.Busy(true);
            await GetMetaDataInfo()
                .then(async (res) => {
                    const enums = res.filter((x) => x.Type === 'Enum') || [];
                    setDropDownOptions(enums);
                    global.Busy(false);
                    return resolve(true);
                });

        });
    }

    useEffect(() => {
        const fetchData = async () => {
            if (initialized) {
                await FetchMetaDataInfo().then(async () => {
                    await FetchProductDetails();
                });
            }
        };
        fetchData();
    }, [initialized]);

    useEffect(() => {
        setInitialized(true);
    }, [id]);

    return (

        <>
            <Container {...props}>
                <Box style={{ paddingBottom: 4, width: "100%" }}>
                    <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%" }}>
                            <Typography noWrap variant="subheader" component="div">
                                {title}
                            </Typography>
                        </Box>
                        <Grid container sx={{ alignItems: "center", justifyContent: 'flex-end', gap: 1, pt: 1, pb: 1 }}>
                            <Button variant="contained" startIcon={<EditIcon />}
                                onClick={() => NavigateTo(`/Products/edit/${id}`)}
                            >Edit</Button>
                            <Button variant="contained" startIcon={<ArrowLeftIcon />}
                                onClick={() => NavigateTo("/Products")}
                            >Back</Button>
                        </Grid>
                    </Stack>
                </Box>
                <Divider />
                <RenderFormContols shadow={true} {...props} mode={"view"} options={dropDownOptions} controls={row} />
            </Container>
        </>

    );

};

export default Component;