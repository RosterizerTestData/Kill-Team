let titleCase = function(sentence){
  return sentence.replace(/^\s*(.*[^\s])*\s*$/,'$1').replace(/\s+/g,' ').toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ').replace(/ Of /g,' of ').replace(/ The /g,' the ').replace(/ With /g,' with ').replace(/ In /g,' in ').replace(/ On /g,' on ').replace(/ Of /g,' of ').replace(/ And /g,' and ')
}

const fileList = [
  'Kill-Team.rulebook'
];
fileList.forEach(file => {
  fetch('../' + file)
  .then(response => response.json())
  .then(data => {
    console.log(data.name,data)
    let rulebook = JSON.parse(JSON.stringify(data));
    rulebook.rulebook.assetCatalog = {};
    Object.entries(data.rulebook.assetCatalog).forEach(([itemKey,item]) => {
      if(itemKey.split('§')[0] !== 'Operative'){
        rulebook.rulebook.assetCatalog[itemKey] = item;
      }else{
        rulebook.rulebook.assetCatalog[`Operative§${item.keywords['Kill Team']}—${itemKey.split('§')[1]}`] = {
          ...item,
          aspects: {
            ...(item.aspects || {}),
            Label: itemKey.split('§')[1],
          }
        };
      }
    });
    console.log(rulebook)
  })
  .catch(error => {
    // Handle any error that occurs during loading
    console.error(error);
  });
})