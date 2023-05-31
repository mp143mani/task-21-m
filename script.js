
    const itemsPerPage = 12;
    let currentPage = 1;
    let countriesData = [];

    // Fetch countries data from the API
    async function fetchCountriesData() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        countriesData = response.data;
        displayCountries(currentPage);
        setupPagination();
      } catch (error) {
        console.log(error);
      }
    }

    // Display countries on the current page
    function displayCountries(page) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const countryTableBody = document.getElementById('countryTableBody');
      countryTableBody.innerHTML = '';

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= countriesData.length) break;

        const country = countriesData[i];
        const flag = country.flags.svg;
        const name = country.name.common;
        const continent = country.region;
        const currency = Object.values(country.currencies)[0].name;
        const independent = country.independent ? 'Yes' : 'No';
        const capital = country.capital;
        const timezones = country.timezones.join(', ');

        const row = `
          <tr>
            <td><img src="${flag}" width="30" height="20" alt="Country Flag"></td>
            <td>${name}</td>
            <td>${continent}</td>
            <td>${currency}</td>
            <td>${independent}</td>
            <td>${capital}</td>
            <td>${timezones}</td>
          </tr>
        `;
        countryTableBody.innerHTML += row;
      }
    }

    // Setup pagination links
    function setupPagination() {
      const pagination = document.getElementById('pagination');
      pagination.innerHTML = '';

      const totalPages = Math.ceil(countriesData.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
      }
    }

    // Change the current page
    function changePage(page) {
      currentPage = page;
      displayCountries(currentPage);
      highlightCurrentPage();
    }

    // Highlight the current active page
    function highlightCurrentPage() {
      const pagination = document.getElementById('pagination');
      const pages = pagination.getElementsByTagName('a');

      for (let i = 0; i < pages.length; i++) {
        if (i === currentPage - 1) {
          pages[i].classList.add('active');
        } else {
          pages[i].classList.remove('active');
        }
      }
    }

    // Fetch countries data on page load
    fetchCountriesData();
