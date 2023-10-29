using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleCars5_15.Data;

namespace ReactPeopleCars5_15.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonCarsController : ControllerBase
    {
        private string _connectionString;
        public PersonCarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonCarsRepo(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarsRepo(_connectionString);
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PersonCarsRepo(_connectionString);
            repo.AddCar(car);
        }
        [HttpGet]
        [Route("getpersonbyid")]
        public Person GetPersonById(int id)
        {
            var repo = new PersonCarsRepo(_connectionString);
            return repo.GetPersonById(id);
        }
        [HttpPost]
        [Route("deletecarsforperson")]
        public void DeleteCarsForPerson(Person person)
        {
            var repo = new PersonCarsRepo(_connectionString);
            repo.DeleteCarsForPerson(person.Id);
        }
    }
}
