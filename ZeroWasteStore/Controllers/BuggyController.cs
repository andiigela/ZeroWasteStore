using Microsoft.AspNetCore.Mvc;

namespace ZeroWasteStore.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() // not found , client fault
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() // problem saving changes
        {
            return BadRequest(new ProblemDetails { Title="This is a bad request"});
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError() // prej modelit
        {
            ModelState.AddModelError("Problem1","This is the first error");
            ModelState.AddModelError("Problem2","This is the second error");
            return ValidationProblem(); // errors from ModelState
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            try
            {
                throw new Exception("This is a server error");
            }
            catch(Exception e)
            {
                Console.Write(e.Message);
            }
            return null;
            
        }

    }
}
