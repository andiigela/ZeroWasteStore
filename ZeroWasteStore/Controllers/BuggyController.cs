using Microsoft.AspNetCore.Mvc;

namespace ZeroWasteStore.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult getNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult getBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }
        [HttpGet("unauthorized")]
        public ActionResult getUnauthorized()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult getValidationError()
        {
            ModelState.AddModelError("Problem1","This is the first error");
            ModelState.AddModelError("Problem2","This is the second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult getServerError()
        {
            try
            {
                throw new Exception("This is a server error");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return null;
            
        }

    }
}
