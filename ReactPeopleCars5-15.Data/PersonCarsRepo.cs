using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars5_15.Data
{
    public class PersonCarsRepo
    {
        private readonly string _connectionString;
        public PersonCarsRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            var context = new PeopleCarsDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public void AddPerson(Person person)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void AddCar(Car car)
        {
            //var selectedPerson = GetPersonById(car.PersonId);
            //if (selectedPerson.Cars == null)
            //{
            //    selectedPerson.Cars = new List<Car>();
            //}
            var context = new PeopleCarsDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
            //return context.Cars.Where(c => c.PersonId == car.PersonId).Count();
        }
        public Person GetPersonById(int id)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            return context.People.Include(p => p.Cars).FirstOrDefault(p => p.Id == id);
        }
        public void DeleteCarsForPerson(int id)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            context.RemoveRange(context.Cars.Where(c => c.PersonId == id));
            context.SaveChanges();
        }
    }
}
