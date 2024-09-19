// CONFIGURAÇÕES DA LOJA
const LOGO = 'https://static.vecteezy.com/system/resources/thumbnails/010/842/736/small_2x/online-shopping-text-banner-marketing-pop-art-banner-design-png.png';
const NOME_DA_LOJA = 'SHOP ONLINE VIDEO';
const COR_PRIMARIA = '#DB1A07';
const COR_SECUNDARIA = '#FA620A';
const COR_DE_FUNDO = '#ecf0f1';
const COR_DO_TEXTO = '#34495e';
const HORARIO_FUNCIONAMENTO_SEG_A_SEX = '9h às 18h';
const HORARIO_FUNCIONAMENTO_SABADO = '9h às 13h';
const FORMAS_DE_PAGAMENTO = 'Aceitamos cartões de crédito, débito, PIX e dinheiro';
const FORMAS_DE_PAGAMENTO_OPCOES = 'Cartão de Crédito, Cartão de Débito, Pix, Dinheiro, Foma teste';
const ENDERECO = 'Rua das Flores, 123 - Centro';
const TELEFONE = '(11) 1234-5678';
const EMAIL = 'contato@lojaonlinemoderna.com';

// Recupera todos os dados dos produtos na planilha que possui a aba Produtos
function getProducts() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Produtos");
    var data = sheet.getDataRange().getValues();
    var products = [];
    
    for (var i = 1; i < data.length; i++) {
        var product = {
            id: data[i][0],
            name: data[i][1],
            price: data[i][2],
            image: data[i][3].replace('//','\/\/')
        };
        products.push(product);
    }
    return JSON.stringify(products);
}

// Abre a página index.html

function doGet() {
  var template = HtmlService.createTemplateFromFile('index.html');
  template.products = getProducts();
  template.convertColor = function(hex, transparency) {
    hexToRGB(hex, transparency);
  };
  template.config = {
    brand: LOGO,
    shopname: NOME_DA_LOJA,
    primaryColor: COR_PRIMARIA,
    secondaryColor: COR_SECUNDARIA,
    backgroundColor: COR_DE_FUNDO,
    textColor: COR_DO_TEXTO,
    hoursOperationMonFri: HORARIO_FUNCIONAMENTO_SEG_A_SEX,
    hoursOperationSaturday: HORARIO_FUNCIONAMENTO_SABADO,
    paymentForms: FORMAS_DE_PAGAMENTO,
    paymentFormsOptions: FORMAS_DE_PAGAMENTO_OPCOES,
    address: ENDERECO,
    telephone: TELEFONE,
    email: EMAIL
  };
  var htmlContent = template.evaluate().getContent();
  var output = HtmlService.createHtmlOutput(htmlContent);
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}