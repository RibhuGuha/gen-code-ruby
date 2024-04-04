import {
	
		
 	
		
 	 	
		
 	
		
 	 	 	 	 							// For Nested APIs / Join tables			
	 	 	
		
 	
		
 	
		
 	 	
	
 	
		
 	  , SetOtherDetailsSingle, SetOrderItemSingle, SetProductTypeSingle, SetProductSingle, SetProductOtherImagesJoin, SetProductPriceSingle, SetSupplierSingle, SetShipmentItemSingle, SetDocumentSingleMedia, SetProductOnBoardingSingle
} from "./services";
import Helper from "shared/helper";

var fn = {};

const defaultError = "Something went wrong while processing request!";

		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_OtherDetails = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
 x.key === 'ManufacturingDate'  ||                      ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_OtherDetails.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetOtherDetailsSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_OrderItem = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
 x.key === 'RMA_issued_date'  ||                      ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_OrderItem.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetOrderItemSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_ProductType = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_ProductType.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductTypeSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_Product = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_Product.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


fn.AddOrUpdateProduct = async (input, excludesItems) => {
const numberItems_Product = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        global.Busy(true);
        let excludes = excludesItems || [];

        const tmp = Object.values(input);
        tmp.filter((x) => x.value).map((x) => {
            if (excludes.indexOf(x.key) === -1) {
                if (numberItems_Product.indexOf(x.key) > -1) {
                    if (x.value) data[x.key] = parseFloat(x.value);
                } else {
                    data[x.key] = x.value;
                }
            }
        });

        let rslt = await SetProductOtherImagesJoin(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_ProductPrice = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_ProductPrice.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductPriceSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_Supplier = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_Supplier.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetSupplierSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_ShipmentItem = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_ShipmentItem.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetShipmentItemSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_Document = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_Document.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetDocumentSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
    
fn.AddOrUpdateOtherDetails = async (input, enums, excludesItems) => {
const numberItems_ProductOnBoarding = [  $DBUtil.getRegularPropertiesWithQuotes( $ceType ) ];
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (
                    ) {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m.Value) === parseInt(x.value)).Name;
                    } else if (
                    ) {
                        if (x.value) data[x.key] = `${x.value}T00:00:00+00:00`;
                    } else if (numberItems_ProductOnBoarding.indexOf(x.key) > -1) {
                        if (x.value) data[x.key] = parseFloat(x.value);
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetProductOnBoardingSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}




export default fn;