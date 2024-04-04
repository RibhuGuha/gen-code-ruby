
import { useEffect, useState } from "react";
import { Typography, Grid, Stack, Button, Box, Divider } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Container from "screens/container";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "shared/services";
import { GetMetaDataInfo } from "shared/common";
import ProductJsonConfig from "config/Product_detail_config.json";
import RenderFormContols from "./child/formcontrols";
import Support from "shared/support";
import Helper from "shared/helper";

const Component = (props) => {
    const { title } = props;
    const [form, setForm] = React.useState(null);
    const theme = useTheme();
    const NavigateTo = useNavigate();
    const { id } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [state, setState] = useState(false);
    const [row, setRow] = useState({});
    const [backRow, setBackupRow] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const [dropDownOptions, setDropDownOptions] = useState([]);

    const TrackChanges = (name) => {
        const source = JSON.parse(JSON.stringify(backRow[name]));
        const target = JSON.parse(JSON.stringify(row[name]));
        
        
        let changes = [];
        for (let prop of source) {
            let value1 = source.find((x) => x.key === prop.key).value ?? "";
            let value2 = target.find((x) => x.key === prop.key).value ?? "";
            if (['MainImage'].indexOf(prop.key) > -1) {
                value1 = value1.DocName ?? "";
                value2 = value2.DocName ?? "";
            }
            if (value1.toString() !== value2.toString()) {
                changes.push(prop.key);
            }
        }

        return changes;
    }

    const FetchProductDetails = async (enums) => {

        let item = {}, tmp;

            

        ['product',].forEach(elm => {
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
                for (let prop in product) {
                    const tItem = item['product'].find((x) => x.key === prop);
                    if (tItem && !Helper.IsNullValue(product[prop])) {
                            item['product'].find((x) => x.key === prop).value = product[prop];
                    }
                }

                            if (product.MainImage) {
                                const _document = await Support.ExtractDocument(product.MainImage, product.MainImage.DocId);
                                item['product'].find((x) => x.key === "MainImage").value = _document;
                            }
            }


                        
                        
                        
            let bItem = {};

            ['product',].forEach(elm => {
                let bItems = [];
                for (let prop of item[elm]) {
                    bItems.push({ key: prop.key, value: prop.value });
                }
                bItem[elm] = bItems;
            });
            setRow(item);
            setBackupRow(bItem);
            global.Busy(false);
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

    const UpdateBackUp = (name, value) => {
        setBackupRow((prev) => ({ ...prev, [name]: value }));
        setState(!state);
    }

    const OnSubmit = async () => {
        let rslt, data, changes = [];

        let product_id;
        let docId;

                                                                                                                
        
        let product = row['product'];

        

        changes = TrackChanges('product');
        if (changes.length > 0) {
            const filters = ['MainImage'];
            let tmp = changes.filter((x) => filters.indexOf(x) === -1);
            if (tmp.length > 0) {
                rslt = await Support.AddOrUpdateProduct(row['product'], dropDownOptions, [
"MainImage"
                ]);
                if (rslt.status) {
                    row['product'].find((x) => x.key === 'Product_id').value = rslt.id;
                    UpdateBackUp('product');
                } else { return; }
            }
        }

        productId = row['product'].find((x) => x.key === 'Product_id').value || 0;

        
            
            // Add or Update Product MainImage
            changes = TrackChanges('product');
            if (changes.length > 0 && changes.indexOf('MainImage') > -1) {
                data = product.find((x) => x.key === 'MainImage');
                rslt = await Support.AddOrUpdateDocument(data);
                if (rslt.status) {
                    let newImageId = parseInt(rslt.id);
                    data = [
                        { key: "Product_id", value: parseInt(productId) },
                        { key: "productMainImage", value: newImageId }
                    ];
                    rslt = await Support.AddOrUpdateProduct(data, dropDownOptions);
                    if (!rslt.status) return;

                    let newValues = product.find((x) => x.key === 'MainImage').value;
                    newValues = { ...newValues, DocId: newImageId };
                    row['product'].find((x) => x.key === 'MainImage').value = newValues
                    row['product'].find((x) => x.key === 'productMainImage').value = newImageId;
                    // Update Back for next tracking purpose
                    UpdateBackUp('product');

                } else { return; }
            }

        global.AlertPopup("success", "Product is updated successfully!");
        setShowUpdate(false);
        NavigateTo("/products");
    }

    const OnSubmitForm = (e) => {
        e.preventDefault();
        form.current.submit();
    }

    const OnInputChange = (e) => {
        const { name, value, location, ...others } = e;
        let _row = row;
        let _index = row[location].findIndex((x) => x.key === name);
        if (_index > -1) {
            _row[location][_index].value = value;
            setRow(_row);
            setShowUpdate(true);
        }
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
                        <Grid container sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="contained" startIcon={<ArrowLeftIcon />}
                                onClick={() => NavigateTo("/Products")}
                            >Back</Button>
                        </Grid>
                    </Stack>
                </Box>
                <Divider />
                <RenderFormContols {...props} shadow={true} setForm={setForm} mode={"edit"} controls={row} options={dropDownOptions}
                    onInputChange={OnInputChange} onSubmit={OnSubmit} />

                {showUpdate && (
                    <>
                        <Divider />
                        <Box sx={{ width: '100%' }}>
                            <Grid container sx={{ flex: 1, alignItems: "center", justifyContent: 'flex-start', gap: 1, pt: 1, pb: 1 }}>
                                <Button variant="contained" onClick={(e) => OnSubmitForm(e)}>Update</Button>
                                <Button variant="outlined" onClick={() => NavigateTo("/Products")}>Cancel</Button>
                            </Grid>
                        </Box>
                    </>
                )}
            </Container>
        </>

    );

};

export default Component;