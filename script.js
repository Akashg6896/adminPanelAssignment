var url =
  'https://filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

// $('document').ready(() => {
//   console.log('Hello world')
// })
$(() => {
  let tableContainer = document.createElement('div')
  $(tableContainer).attr('id', 'table-data')
  let table = $('<table></table>').text('')
  let customerDetails
  const createTableData = (text, count) => {
    let elem = document.createElement('td')
    elem.innerHTML = text
    $(elem).addClass(`column` + $(count))
    return elem
  }
  const createTableRow = (customer) => {
    let count = 0
    let tableRow = document.createElement('tr')
    $(tableRow).attr('id', customer.id)
    tableRow.append(
      createTableData(customer.id, ++count),
      createTableData(customer.firstName, ++count),
      createTableData(customer.lastName, ++count),
      createTableData(customer.email, ++count),
      createTableData(customer.phone, ++count)
    )
    tableRow.classList.add('data-row')
    return tableRow
  }
  const tableRowClickEvent = () => {
    let tableRows = document.querySelectorAll('tr')
    for (let tableRow of tableRows) {
      $(tableRow).click((e) => {
        console.log(tableRow)
        $(tableRows).removeClass('active')
        e.target.parentElement.classList.toggle('active')
        let customerSelected = customerDetails.find(
          (customer) => customer.id == e.target.parentElement.id
        )
        $('#info-content').empty()
        $('#info-content').append(`<div><b>User selected:</b> 
            ${customerSelected.firstName} 
            ${customerSelected.lastName}</div>
            <div>
              <b>Description: </b>
              <textarea cols="50" rows="5" readonly>
              ${customerSelected.description}</textarea>
            </div>
            <div><b>Address:</b> ${customerSelected.address.streetAddress}</div>
            <div><b>City:</b> ${customerSelected.address.city}</div>
            <div><b>State:</b> ${customerSelected.address.state}</div>
            <div><b>Zip:</b> ${customerSelected.address.zip}</div>`)

        $('#info-content').css({ display: 'block' })
      })
    }
  }
  const addCustomerDetails = (customerDetailsArr) => {
    $('#table-data').empty()
    let tbody = document.createElement('tbody')
    for (let customer of customerDetailsArr) {
      tbody.append(createTableRow(customer))
    }
    $(table).append(tbody)
    $(tableContainer).append(table)
    $('#table-wrapper').append(tableContainer)
  }
  $.get(url)
    .then((res) => (customerDetails = res))
    .then(() => {
      addCustomerDetails(customerDetails)
    })
    .then(() => {
      tableRowClickEvent()
    })

  $('#search-box').on('keyup', (e) => {
    const searchBoxValue = e.target.value
    $(table).empty()
    const filteredCustomerDetails = customerDetails.filter(
      (customer) =>
        customer.firstName.includes(searchBoxValue) ||
        customer.lastName.includes(searchBoxValue) ||
        customer.email.includes(searchBoxValue)
    )
    addCustomerDetails(filteredCustomerDetails)
    tableRowClickEvent()
  })
})
