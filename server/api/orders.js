const router = require('express').Router()
const {Order, orderProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')
var nodemailer = require('nodemailer')

module.exports = router

var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pastabilities4life@gmail.com',
    pass: 'pasta4life'
  }
})

//authenticate admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//authenticate user
const isUser = (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//get all orders from 'Order' Table -- eager load products
//admin only
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [Product],
      order: [['id', 'ASC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get single order by orderId -- eager load products
// admin or user
router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const singleOrder = await Order.findOne({
      where: {
        id: orderId
      },
      include: [{model: Product}]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

//get all orders for a single user -- eager load products
router.get('/orderHistory/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const orders = await Order.findAll({
      where: {
        userId: userId
      },
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// PUT Update Order Status -- admin only
//add back is admin
router.put('/:id', async (req, res, next) => {
  try {
    const orderId = +req.params.id
    const {status} = req.body
    let isUpdated
    isUpdated = await Order.update(
      {status},
      {
        where: {
          id: orderId
        }
      }
    )
    res.json(isUpdated)
  } catch (err) {
    next(err)
  }
})

// POST Create Order
// add admin or user back
router.post('/checkout', async (req, res, next) => {
  const {
    email,
    status,
    userId,
    cart,
    streetLine1,
    city,
    state,
    zipCode,
    streetLine2
  } = req.body

  // if (isAdmin || req.user.id === userId) {
  try {
    const instance = await Order.create({
      status,
      email,
      orderDate: new Date(),
      userId,
      streetLine1,
      city,
      state,
      zipCode,
      streetLine2
    })

    cart.forEach(element => {
      orderProduct.create({
        quantity: element.quantity,
        price: element.price,
        productId: element.id,
        orderId: instance.id
      })
    })

    const orderQuantity = 5
    const subTotal = 100.0
    const salesTax = 7.0
    const total = subTotal + salesTax
    const deliveryDate = 'January 16, 2019'

    var mailOptions = {
      from: 'pastabilities4life@gmail.com',
      to: 'celipas@gmail.com',
      subject: `Your Pastabailties order ${instance.id}`,
      html: `<body>
      <div class="es-wrapper-color">
          <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#eeeeee"></v:fill>
        </v:background>
      <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                  <tr>
                      <td class="esd-email-paddings" valign="top">
                          <table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr> </tr>
                                  <tr>
                                      <td class="esd-stripe" esd-custom-block-id="7954" align="center">
                                          <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p15t es-p15b es-p10r es-p10l" align="left">
                                                          <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="282" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="282" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="es-infoblock esd-block-text es-m-txt-c" align="left">
                                                                                          <p style="font-family: arial, helvetica\ neue, helvetica, sans-serif;">Put your preheader text here<br></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="278" valign="top"><![endif]-->
                                                          <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="278" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="es-infoblock esd-block-text es-m-txt-c" align="right">
                                                                                          <p><a href="http://#" target="_blank" style="font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">View in browser</a><br></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr> </tr>
                                  <tr>
                                      <td class="esd-stripe" esd-custom-block-id="7681" align="center">
                                          <table class="es-header-body" style="background-color: rgb(4, 71, 103);" width="600" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p35t es-p35b es-p35r es-p35l" align="left">
                                                          <!--[if mso]><table width="530" cellpadding="0" cellspacing="0"><tr><td width="340" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p0r es-m-p20b esd-container-frame" width="340" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-m-txt-c" align="left">
                                                                                          <h1 style="color: #ffffff; line-height: 100%;">Pastabilities</h1>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="170" valign="top"><![endif]-->
                                                          <table cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr class="es-hidden">
                                                                      <td class="es-m-p20b esd-container-frame" esd-custom-block-id="7704" width="170" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-spacer es-p5b" align="center">
                                                                                          <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td style="border-bottom: 1px solid rgb(4, 71, 103); background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          <table cellspacing="0" cellpadding="0" align="right">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td align="left">
                                                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td class="esd-block-text" align="right">
                                                                                                                          <p><a target="_blank" style="font-size: 18px; line-height: 120%;" href="http://localhost:8080/products/">Shop</a></p>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                      <td class="esd-block-image es-p10l" valign="top" align="left">
                                                                                                          <a href="https://viewstripo.email/" target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/77981522050090360.png" alt="" style="display: block;" width="27"></a>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p40t es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-p25t es-p25b es-p35r es-p35l" align="center">
                                                                                          <a target="_blank" href="https://viewstripo.email/"> <img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/67611522142640957.png" alt="" style="display: block;" width="120"> </a>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10b" align="center">
                                                                                          <h2>Thank You For Your Order!</h2>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p15t es-p20b" align="left">
                                                                                          <p style="font-size: 16px; color: #777777;">Get excited! Your order is being prepared and will ship soon! Think of what you can do with your order...the pastabilities are endless...<br></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p20t es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10t es-p10b es-p10r es-p10l" bgcolor="#eeeeee" align="left">
                                                                                          <table style="width: 500px;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td width="80%">
                                                                                                          <h4>Order Confirmation #</h4>
                                                                                                      </td>
                                                                                                      <td width="20%">
                                                                                                          <h4>${
                                                                                                            instance.id
                                                                                                          }</h4>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10t es-p10b es-p10r es-p10l" align="left">
                                                                                          <table style="width: 500px;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td style="padding: 5px 10px 5px 0" width="80%" align="left">
                                                                                                          <p>Purchased Item ${orderQuantity}</p>
                                                                                                      </td>
                                                                                                      <td style="padding: 5px 0" width="20%" align="left">
                                                                                                          <p>$${subTotal}</p>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                                  <tr>
                                                                                                      <td style="padding: 5px 10px 5px 0" width="80%" align="left">
                                                                                                          <p>Sales Tax</p>
                                                                                                      </td>
                                                                                                      <td style="padding: 5px 0" width="20%" align="left">
                                                                                                          <p>$${salesTax}</p>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p10t es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table style="border-top: 3px solid rgb(238, 238, 238); border-bottom: 3px solid rgb(238, 238, 238);" width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p15t es-p15b es-p10r es-p10l" align="left">
                                                                                          <table style="width: 500px;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td width="80%">
                                                                                                          <h4>TOTAL</h4>
                                                                                                      </td>
                                                                                                      <td width="20%">
                                                                                                          <h4>$${total}</h4>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p40t es-p40b es-p35r es-p35l" esd-custom-block-id="7796" align="left">
                                                          <!--[if mso]><table width="530" cellpadding="0" cellspacing="0"><tr><td width="255" valign="top"><![endif]-->
                                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame es-m-p20b" width="255" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p15b" align="left">
                                                                                          <h4>Delivery Address</h4>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p10b" align="left">
                                                                                          <p>${streetLine1}</p>
                                                                                          <p>${streetLine2}</p>
                                                                                          <p>${city}, ${state} ${zipCode}</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td><td width="20"></td><td width="255" valign="top"><![endif]-->
                                                          <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="255" align="left">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p15b" align="left">
                                                                                          <h4>Estimated Delivery Date<br></h4>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text" align="left">
                                                                                          <p>${deliveryDate}</p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if mso]></td></tr></table><![endif]-->
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" esd-custom-block-id="7797" align="center">
                                          <table class="es-content-body" style="background-color: rgb(27, 155, 163);" width="600" cellspacing="0" cellpadding="0" bgcolor="#1b9ba3" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p35t es-p35b es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">

                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" esd-custom-block-id="7684" align="center">
                                          <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-p15b" align="center">
                                                                                          <a target="_blank"> <img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/12331522050090454.png" alt="Pastabilities logo" style="display: block;" title="Pastabilities logo" width="37"> </a>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-p35b" align="center">
                                                                                          <p><strong>405 W Superior </strong></p>
                                                                                          <p><strong>Chicago, IL 60654</strong></p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td class="esd-block-text es-m-txt-c es-p5b" esdev-links-color="#777777" align="left">
                                                                                          <p style="color: #777777;">If you didn't create an account using this email address, please ignore this email or&nbsp;<u><a target="_blank" style="color: #777777;" href="http://learn.fullstackacademy.com">unsubscribe</a></u>.<br></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe" align="center">
                                          <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                          <table width="100%" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-image es-infoblock" align="center">
                                                                                          <a target="_blank" href="http://learn.fullstackacademy.com"> <img src="https://tlr.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt="" width="125"> </a>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>`

      // setTimeout()
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    res.json(instance)
  } catch (err) {
    next(err)
  }
})
