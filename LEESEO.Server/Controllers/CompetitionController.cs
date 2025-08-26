using Microsoft.AspNetCore.Mvc;

namespace LEESEO.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionsController : ControllerBase
    {
        private static readonly List<CompetitionRegistration> Registrations = new();

        private readonly ILogger<CompetitionsController> _logger;

        public CompetitionsController(ILogger<CompetitionsController> logger)
        {
            _logger = logger;
        }

        // GET: api/competitions
        [HttpGet]
        public ActionResult<IEnumerable<CompetitionRegistration>> Get()
        {
            return Ok(Registrations);
        }

        // POST: api/competitions
        [HttpPost]
        public ActionResult<CompetitionRegistration> Post([FromBody] CompetitionRegistration registration)
        {
            registration.Id = Registrations.Count + 1;
            Registrations.Add(registration);

            _logger.LogInformation("Peserta baru terdaftar: {Name} untuk lomba {Competition}",
                registration.ParticipantName, registration.CompetitionName);

            return Ok(registration);
        }
    }
}
