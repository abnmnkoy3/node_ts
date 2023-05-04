import express, { Application, NextFunction, Request, Response } from 'express';
const port = 3001;
const app = express();
var multer = require('multer');
const mysql = require('mysql');
var cors = require('cors');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'vandapa1_kpi'
})
app.use(cors())
app.use(express.json());
var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'C:/xampp/htdocs/ImageSave')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)

    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {

    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })

});

app.post('/delete_chemical', function (req: any, res: any) {
    const id = req.body.id
    db.query(`DELETE FROM test_insert_chemical WHERE id = ${id}`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({ message: 'ลบข้อมูลเสร็จสิ้น' });
        }
    })
})

app.post('/disabled_chemical', function (req: any, res: any) {
    const id = req.body.id
    db.query(`UPDATE test_insert_chemical SET status = '4' WHERE id = ${id}`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({ message: 'ลบข้อมูลเสร็จสิ้น' });
        }
    })
})

app.post('/remake_chemical', function (req: any, res: any) {
    const id = req.body.id
    db.query(`UPDATE test_insert_chemical SET status = '1' WHERE id = ${id}`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json({ message: 'ลบข้อมูลเสร็จสิ้น' });
        }
    })
})


app.post('/data_edit', function (req: any, res: any) {
    const id = req.body.id
    db.query(`SELECT * FROM test_insert_chemical WHERE id = ${id}`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    })
})

app.post('/rejected_chemical', function (req: any, res: any) {
    const id = req.body.id
    db.query(`UPDATE test_insert_chemical SET status = '3' WHERE id = '${id}' `, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    })
})

app.get('/get_pending', function (req: any, res: any) {
    db.query(`SELECT * FROM test_insert_chemical WHERE status = '1'`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    })
})

app.post('/get_chemical_all', function (req: any, res: any) {
    const division = req.body.division_check;
    let sql: string;
    if (division == 'safety' || division == 'ADMIN') {
        sql = `SELECT * FROM test_insert_chemical ORDER BY status ASC`;
    } else {
        sql = `SELECT * FROM test_insert_chemical WHERE division = '${division}' ORDER BY status ASC`;
    }
    db.query(sql, (err: any, result: any) => {
        // db.query(`SELECT * FROM test_insert_chemical`, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    })
})

app.post('/update_data', function (req: any, res: any) {
    const id = req.body.data_set.id_check
    const ssds = req.body.data_set.ssds_show
    const id_ssds = req.body.data_set.id_ssds
    const division = req.body.data_set.division
    const coden_coder = req.body.data_set.coden_coder
    const list_chemical_products = req.body.data_set.list_chemical_products
    const chemical_name = req.body.data_set.chemical_name
    const cas_no = req.body.data_set.cas_no
    const un_no = req.body.data_set.un_no
    const purpose_use = req.body.data_set.purpose_use
    const substance = req.body.data_set.substance
    const characteristics = req.body.data_set.characteristics
    const concentration = req.body.data_set.concentration
    const density = req.body.data_set.density
    const control = req.body.data_set.control
    const component = req.body.data_set.component
    const un_class = req.body.data_set.un_class
    const ghs_physical = req.body.data_set.ghs_physical
    const ghs_health = req.body.data_set.ghs_health
    const ghs_environmental = req.body.data_set.ghs_environmental
    const storage_type = req.body.data_set.storage_type
    const total_year = req.body.data_set.total_year
    const unit_1 = req.body.data_set.unit_1
    const maximum_storage = req.body.data_set.maximum_storage
    const unit_2 = req.body.data_set.unit_2
    const container_type = req.body.data_set.container_type
    const container_capacity = req.body.data_set.container_capacity
    const container_quantity = req.body.data_set.container_quantity
    const extinguishing = req.body.data_set.extinguishing
    const storage_location = req.body.data_set.storage_location
    const area_of_use = req.body.data_set.area_of_use
    const ordered_month = req.body.data_set.ordered_month
    const according_the_list_1 = req.body.data_set.according_the_list_1
    const according_the_list_2 = req.body.data_set.according_the_list_2
    const delivery_status = req.body.data_set.delivery_status
    const delivery_date = req.body.data_set.delivery_date
    const order_report = req.body.data_set.order_report
    const order_announcement = req.body.data_set.order_announcement
    const hazardous_chemicals = req.body.data_set.hazardous_chemicals
    const measurement_record = req.body.data_set.measurement_record
    const select_6_2 = req.body.data_set.select_6_2
    const select_6_21 = req.body.data_set.select_6_21
    const select_6_22 = req.body.data_set.select_6_22
    const select_6_23 = req.body.data_set.select_6_23
    const select_6_32 = req.body.data_set.select_6_32
    const select_9_20 = req.body.data_set.select_9_20
    const select_9_22 = req.body.data_set.select_9_22
    const select_9_41 = req.body.data_set.select_9_41
    const related_laws = req.body.data_set.related_laws
    const legal_compliance = req.body.data_set.legal_compliance
    const management = req.body.data_set.management
    const fm_sh_17 = req.body.data_set.fm_sh_17
    const note = req.body.data_set.note
    if (id !== '') {
        var sql_update = `UPDATE test_insert_chemical SET ssds = '${ssds}' , id_ssds = '${id_ssds}', division = '${division}',coden_coder =${coden_coder}, list_chemical_products= '${list_chemical_products}',
        chemical_name = '${chemical_name}', cas_no = '${cas_no}',un_no = '${un_no}',purpose_use = '${purpose_use}',substance = '${substance}',characteristics = '${characteristics}',
        characteristics = '${characteristics}',concentration = '${concentration}',density = '${density}',control = '${control}',component = '${component}',un_class = '${un_class}',
        ghs_physical = '${ghs_physical}',ghs_health = '${ghs_health}',ghs_environmental = '${ghs_environmental}',storage_type = '${storage_type}',total_year = '${total_year}',
        total_year = '${total_year}',unit_1 = '${unit_1}',maximum_storage = '${maximum_storage}',unit_2 = '${unit_2}',container_type = '${container_type}',container_capacity = '${container_capacity}',
        container_quantity = '${container_quantity}',container_quantity = '${container_quantity}',extinguishing = '${extinguishing}',storage_location = '${storage_location}',area_of_use = '${area_of_use}',
        ordered_month = '${ordered_month}',according_the_list_1 = '${according_the_list_1}',according_the_list_2 = '${according_the_list_2}',delivery_status = '${delivery_status}',
        delivery_date = '${delivery_date}',order_report = '${order_report}',order_announcement = '${order_announcement}',hazardous_chemicals = '${hazardous_chemicals}',measurement_record = '${measurement_record}',
        select_6_2 = '${select_6_2}',select_6_21 = '${select_6_21}',select_6_22 = '${select_6_22}',select_6_23 = '${select_6_23}',select_6_23 = '${select_6_23}',select_6_32 = '${select_6_32}',
        select_9_20 = '${select_9_20}',select_9_22 = '${select_9_22}',select_9_41 = '${select_9_41}',related_laws = '${related_laws}',legal_compliance = '${legal_compliance}',
        management = '${management}',fm_sh_17 = '${fm_sh_17}',note = '${note}',status = '2' WHERE id = '${id}' `
        db.query(sql_update, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(result);
            }
        })
    }
})

app.post('/insert_data', function (req: any, res: any) {
    const id = req.body.data_set.id_check == undefined ? '' : req.body.data_set.id_check;
    const ssds = req.body.data_set.ssds == undefined ? '' : req.body.data_set.ssds;
    const id_ssds = req.body.data_set.id_ssds == undefined ? '' : req.body.data_set.id_ssds;
    const division = req.body.data_set.division == undefined ? '' : req.body.data_set.division;
    const coden_coder = req.body.data_set.coden_coder == undefined ? '' : req.body.data_set.coden_coder;
    const list_chemical_products = req.body.data_set.list_chemical_products == undefined ? '' : req.body.data_set.list_chemical_products;
    const chemical_name = req.body.data_set.chcemical_name == undefined ? '' : req.body.data_set.chcemical_name;
    const cas_no = req.body.data_set.cas_no == undefined ? '' : req.body.data_set.chcemical_name;
    const un_no = req.body.data_set.un_no == undefined ? '' : req.body.data_set.un_no;
    const purpose_use = req.body.data_set.purpose_use == undefined ? '' : req.body.data_set.purpose_use;
    const substance = req.body.data_set.substance == undefined ? '' : req.body.data_set.substance
    const characteristics = req.body.data_set.characteristics == undefined ? '' : req.body.data_set.characteristics
    const concentration = req.body.data_set.concentration == undefined ? '' : req.body.data_set.concentration
    const density = req.body.data_set.density == undefined ? '' : req.body.data_set.density
    const control = req.body.data_set.control == undefined ? '' : req.body.data_set.control
    const component = req.body.data_set.component == undefined ? '' : req.body.data_set.component
    const un_class = req.body.data_set.un_class == undefined ? '' : req.body.data_set.un_class
    const ghs_physical = req.body.data_set.ghs_physical == undefined ? '' : req.body.data_set.ghs_physical
    const ghs_health = req.body.data_set.ghs_health == undefined ? '' : req.body.data_set.ghs_health
    const ghs_environmental = req.body.data_set.ghs_environmental == undefined ? '' : req.body.data_set.ghs_environmental
    const storage_type = req.body.data_set.storage_type == undefined ? '' : req.body.data_set.storage_type
    const total_year = req.body.data_set.total_year == undefined ? '' : req.body.data_set.total_year
    const unit_1 = req.body.data_set.unit_1 == undefined ? '' : req.body.data_set.unit_1
    const maximum_storage = req.body.data_set.maximum_storage == undefined ? '' : req.body.data_set.maximum_storage
    const unit_2 = req.body.data_set.unit_2 == undefined ? '' : req.body.data_set.unit_2
    const container_type = req.body.data_set.container_type == undefined ? '' : req.body.data_set.container_type
    const container_capacity = req.body.data_set.container_capacity == undefined ? '' : req.body.data_set.container_capacity
    const container_quantity = req.body.data_set.container_quantity == undefined ? '' : req.body.data_set.container_quantity
    const extinguishing = req.body.data_set.extinguishing == undefined ? '' : req.body.data_set.extinguishing
    const storage_location = req.body.data_set.storage_location == undefined ? '' : req.body.data_set.storage_location
    const area_of_use = req.body.data_set.area_of_use == undefined ? '' : req.body.data_set.area_of_use
    const ordered_month = req.body.data_set.ordered_month == undefined ? '' : req.body.data_set.ordered_month
    const according_the_list_1 = req.body.data_set.according_the_list_1 == undefined ? '' : req.body.data_set.according_the_list_1
    const according_the_list_2 = req.body.data_set.according_the_list_2 == undefined ? '' : req.body.data_set.according_the_list_2
    const delivery_status = req.body.data_set.delivery_status == undefined ? '' : req.body.data_set.delivery_status
    const delivery_date = req.body.data_set.delivery_date == undefined ? '' : req.body.data_set.delivery_date
    const order_report = req.body.data_set.order_report == undefined ? '' : req.body.data_set.order_report
    const order_announcement = req.body.data_set.order_announcement == undefined ? '' : req.body.data_set.order_announcement
    const hazardous_chemicals = req.body.data_set.hazardous_chemicals == undefined ? '' : req.body.data_set.hazardous_chemicals
    const measurement_record = req.body.data_set.measurement_record == undefined ? '' : req.body.data_set.measurement_record
    const select_6_2 = req.body.data_set.select_6_2 == undefined ? '' : req.body.data_set.select_6_2
    const select_6_21 = req.body.data_set.select_6_21 == undefined ? '' : req.body.data_set.select_6_21
    const select_6_22 = req.body.data_set.select_6_22 == undefined ? '' : req.body.data_set.select_6_22
    const select_6_23 = req.body.data_set.select_6_23 == undefined ? '' : req.body.data_set.select_6_23
    const select_6_32 = req.body.data_set.select_6_32 == undefined ? '' : req.body.data_set.select_6_32
    const select_9_20 = req.body.data_set.select_9_20 == undefined ? '' : req.body.data_set.select_9_20
    const select_9_22 = req.body.data_set.select_9_22 == undefined ? '' : req.body.data_set.select_9_22
    const select_9_41 = req.body.data_set.select_9_41 == undefined ? '' : req.body.data_set.select_9_41
    const related_laws = req.body.data_set.related_laws == undefined ? '' : req.body.data_set.related_laws
    const legal_compliance = req.body.data_set.legal_compliance == undefined ? '' : req.body.data_set.legal_compliance
    const management = req.body.data_set.management == undefined ? '' : req.body.data_set.management
    const fm_sh_17 = req.body.data_set.fm_sh_17 == undefined ? '' : req.body.data_set.fm_sh_17
    const note = req.body.data_set.note == undefined ? '' : req.body.data_set.note

    var sql = `INSERT INTO test_insert_chemical (ssds,id_ssds,division,coden_coder,list_chemical_products,chemical_name,cas_no,un_no,purpose_use,substance,characteristics,
        concentration,density,control,component,un_class,ghs_physical,ghs_health,ghs_environmental,storage_type,total_year,unit_1,maximum_storage,unit_2,container_type,
        container_capacity,container_quantity,extinguishing,storage_location,area_of_use,ordered_month,according_the_list_1,according_the_list_2,delivery_status,delivery_date,
        order_report,order_announcement,hazardous_chemicals,measurement_record,select_6_2,select_6_21,select_6_22,select_6_23,select_6_32,select_9_20,select_9_22,select_9_41,
        related_laws,legal_compliance,management,fm_sh_17,note,status) VALUES ('${ssds}','${id_ssds}','${division}','${coden_coder}','${list_chemical_products}','${chemical_name}','${cas_no}',
        '${un_no}','${purpose_use}','${substance}','${characteristics}','${concentration}','${density}','${control}','${component}','${un_class}','${ghs_physical}','${ghs_health}','${ghs_environmental}',
       '${storage_type}','${total_year}','${unit_1}','${maximum_storage}','${unit_2}','${container_type}','${container_capacity}','${container_quantity}','${extinguishing}','${storage_location}',
       '${area_of_use}','${ordered_month}','${according_the_list_1}','${according_the_list_2}','${delivery_status}','${delivery_date}','${order_report}','${order_announcement}','${hazardous_chemicals}','${measurement_record}','${select_6_2}','${select_6_21}',
       '${select_6_22}','${select_6_23}','${select_6_32}','${select_9_20}','${select_9_22}','${select_9_41}','${related_laws}','${legal_compliance}','${management}','${fm_sh_17}','${note}','1') `;
    db.query(sql, (err: any, result: any) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    })
})

app.post('/update_data_reject', function (req: any, res: any) {
    const id = req.body.data_set.id_check
    const ssds = req.body.data_set.ssds_show
    const id_ssds = req.body.data_set.id_ssds
    const division = req.body.data_set.division
    const coden_coder = req.body.data_set.coden_coder
    const list_chemical_products = req.body.data_set.list_chemical_products
    const chemical_name = req.body.data_set.chemical_name
    const cas_no = req.body.data_set.cas_no
    const un_no = req.body.data_set.un_no
    const purpose_use = req.body.data_set.purpose_use
    const substance = req.body.data_set.substance
    const characteristics = req.body.data_set.characteristics
    const concentration = req.body.data_set.concentration
    const density = req.body.data_set.density
    const control = req.body.data_set.control
    const component = req.body.data_set.component
    const un_class = req.body.data_set.un_class
    const ghs_physical = req.body.data_set.ghs_physical
    const ghs_health = req.body.data_set.ghs_health
    const ghs_environmental = req.body.data_set.ghs_environmental
    const storage_type = req.body.data_set.storage_type
    const total_year = req.body.data_set.total_year
    const unit_1 = req.body.data_set.unit_1
    const maximum_storage = req.body.data_set.maximum_storage
    const unit_2 = req.body.data_set.unit_2
    const container_type = req.body.data_set.container_type
    const container_capacity = req.body.data_set.container_capacity
    const container_quantity = req.body.data_set.container_quantity
    const extinguishing = req.body.data_set.extinguishing
    const storage_location = req.body.data_set.storage_location
    const area_of_use = req.body.data_set.area_of_use
    const ordered_month = req.body.data_set.ordered_month
    const according_the_list_1 = req.body.data_set.according_the_list_1
    const according_the_list_2 = req.body.data_set.according_the_list_2
    const delivery_status = req.body.data_set.delivery_status
    const delivery_date = req.body.data_set.delivery_date
    const order_report = req.body.data_set.order_report
    const order_announcement = req.body.data_set.order_announcement
    const hazardous_chemicals = req.body.data_set.hazardous_chemicals
    const measurement_record = req.body.data_set.measurement_record
    const select_6_2 = req.body.data_set.select_6_2
    const select_6_21 = req.body.data_set.select_6_21
    const select_6_22 = req.body.data_set.select_6_22
    const select_6_23 = req.body.data_set.select_6_23
    const select_6_32 = req.body.data_set.select_6_32
    const select_9_20 = req.body.data_set.select_9_20
    const select_9_22 = req.body.data_set.select_9_22
    const select_9_41 = req.body.data_set.select_9_41
    const related_laws = req.body.data_set.related_laws
    const legal_compliance = req.body.data_set.legal_compliance
    const management = req.body.data_set.management
    const fm_sh_17 = req.body.data_set.fm_sh_17
    const note = req.body.data_set.note
    if (id !== '') {
        var sql_update = `UPDATE test_insert_chemical SET ssds = '${ssds}' , id_ssds = '${id_ssds}', division = '${division}',coden_coder =${coden_coder}, list_chemical_products= '${list_chemical_products}',
        chemical_name = '${chemical_name}', cas_no = '${cas_no}',un_no = '${un_no}',purpose_use = '${purpose_use}',substance = '${substance}',characteristics = '${characteristics}',
        characteristics = '${characteristics}',concentration = '${concentration}',density = '${density}',control = '${control}',component = '${component}',un_class = '${un_class}',
        ghs_physical = '${ghs_physical}',ghs_health = '${ghs_health}',ghs_environmental = '${ghs_environmental}',storage_type = '${storage_type}',total_year = '${total_year}',
        total_year = '${total_year}',unit_1 = '${unit_1}',maximum_storage = '${maximum_storage}',unit_2 = '${unit_2}',container_type = '${container_type}',container_capacity = '${container_capacity}',
        container_quantity = '${container_quantity}',container_quantity = '${container_quantity}',extinguishing = '${extinguishing}',storage_location = '${storage_location}',area_of_use = '${area_of_use}',
        ordered_month = '${ordered_month}',according_the_list_1 = '${according_the_list_1}',according_the_list_2 = '${according_the_list_2}',delivery_status = '${delivery_status}',
        delivery_date = '${delivery_date}',order_report = '${order_report}',order_announcement = '${order_announcement}',hazardous_chemicals = '${hazardous_chemicals}',measurement_record = '${measurement_record}',
        select_6_2 = '${select_6_2}',select_6_21 = '${select_6_21}',select_6_22 = '${select_6_22}',select_6_23 = '${select_6_23}',select_6_23 = '${select_6_23}',select_6_32 = '${select_6_32}',
        select_9_20 = '${select_9_20}',select_9_22 = '${select_9_22}',select_9_41 = '${select_9_41}',related_laws = '${related_laws}',legal_compliance = '${legal_compliance}',
        management = '${management}',fm_sh_17 = '${fm_sh_17}',note = '${note}',status = '1' WHERE id = '${id}' `
        db.query(sql_update, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(result);
            }
        })
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})