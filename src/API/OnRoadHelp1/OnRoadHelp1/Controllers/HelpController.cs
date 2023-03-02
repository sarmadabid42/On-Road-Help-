using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Collections;
using OnRoadHelp1.Models;
namespace OnRoadHelp1.Controllers
{
    public class HelpController : ApiController
    {
        OnRoadHelpEntities1 db = new OnRoadHelpEntities1();
        [HttpGet]
        public HttpResponseMessage Alluser()
        {
            try
            {
                //  Users obj = new Users();
                var user = db.Users.OrderBy(u => u.id).ToList();
                // obj = db.Users.Select(u => U_id = u.U_id, U_name = u.U_name, U_contact=u.U_contact,U_status=u.U_staus,U_password=u.U_password,U_email=u.U_email);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage Adduser(User newdata)
        {
            try
            {
                db.Users.Add(newdata);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "ok");
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage AddService(AddService n)
        {
            try
            {
                db.AddServices.Add(n);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "ok");
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage AddDate(int id, String toDate, String fromDate)
        {
            try
            {
                if (db.AddServices.Where(v => v.urid == id).Any())
                {
                    AddService services = new AddService();


                    services.DateTime = Convert.ToDateTime(toDate);

                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, services);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Date wrong");
                }
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }


        [HttpPost]
        public HttpResponseMessage Loginusers(User user)
        {
            try
            {
                var result = db.Users.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefault();

                if (result != null)
                {
                    var res = from u in db.Users
                              where u.Email == user.Email && u.Password == user.Password
                              select new {
                                  u.id,
                                  u.First_Name,
                                  u.Last_Name,
                                  u.Email,
                                  u.loginstatus
                              };
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
                //if (result.Count > 0)
                //{
                return Request.CreateResponse(HttpStatusCode.OK, false);
                //}
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }

        }

        [HttpPost]
        public HttpResponseMessage RespondRequest(int helpId, string type)
        {//type: Accept, Reject
            try
            {

                var req = db.HelpRequests.FirstOrDefault(r => r.status == "Pending" && r.Helpid == helpId);

                if (type.Equals("Reject"))
                {
                    req.status = "Pending";
                    var id = req.ResponderId;
                    var services = db.AddServices.Where(s => s.Service_Type == req.u_pcatagory && s.urid != id);

                    if (services.Count() > 0)
                    {
                        var p = services.First();
                        req.ResponderId = p.urid;
                        var dist = Utility.distance(req.lat.Value, req.lon.Value, p.lat.Value, p.lon.Value, 'K');
                        foreach (var item in services)
                        {
                            if (item.urid
                                == id)
                                continue;

                            var dist1 = Utility.distance(req.lat.Value, req.lon.Value, item.lat.Value, item.lon.Value, 'K');
                            if (dist1 < dist)
                            {
                                dist = dist1;
                                req.ResponderId = item.urid;
                            }
                        }
                    }
                }
                else
                {
                    req.status = "Accept";
                    var assigned = new HelpRequestAssigned {
                        AssignedTime = DateTime.Now,
                        HelpRequestId = req.Helpid,
                        UserId = req.ResponderId,
                        StatusFlag = "Accept"
                    };

                    db.HelpRequestAssigneds.Add(assigned);
                }
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }


        [HttpPost]
        public HttpResponseMessage SolveNotRespondingRequests()
        {
            try
            {
                var acceptedRequests = db.HelpRequests.Where(r => r.status == "Accept");

                foreach (var req in acceptedRequests)
                {
                    var assigned = db.HelpRequestAssigneds.FirstOrDefault(d => d.HelpRequestId == req.Helpid && d.StatusFlag == "Accept");
                    if (assigned != null)
                    {
                        var availableService = db.AvailableServices.FirstOrDefault(s => s.Name == req.u_problem);
                        if (availableService != null)
                        {
                            var timeDiff = DateTime.Now.Subtract(assigned.AssignedTime.Value).TotalMinutes;
                            if (timeDiff > availableService.ToleranceTime)
                            {
                                //now search for new Responder.
                                ModifyRequest(req.Helpid, req.u_id.Value);

                            }
                        }
                    }

                }


                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }


        [HttpPost]
        public HttpResponseMessage HelpRequest(HelpRequest newdata)
        {
            try
            {
                newdata.DateTime = DateTime.Now;
                newdata.status = "Pending";
                var services = db.AddServices.Where(s => s.Service_Type == newdata.u_pcatagory);
                if (services.Count() > 0)
                {
                    var p = services.First();
                    newdata.ResponderId = p.urid;
                    var dist = Utility.distance(newdata.lat.Value, newdata.lon.Value, p.lat.Value, p.lon.Value, 'K');
                    foreach (var item in services)
                    {
                        var dist1 = Utility.distance(newdata.lat.Value, newdata.lon.Value, item.lat.Value, item.lon.Value, 'K');
                        if (dist1 < dist)
                        {
                            dist = dist1;
                            newdata.ResponderId = item.urid;
                        }

                    }
                }

                db.HelpRequests.Add(newdata);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, newdata.u_id);
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }
        // time tolerence wala ya function hy  30 or 20 ma accept kary to
        // thk warna ya cncel ho gy dosry ko assign ho jay gi 
        public void ModifyRequest(int hid, int exId)
        {
            try
            {
                HelpRequest newdata = db.HelpRequests.FirstOrDefault(h => h.Helpid == hid);

                newdata.status = "Pending";
                var services = db.AddServices.Where(s => s.Service_Type == newdata.u_pcatagory && s.urid != exId);
                if (services.Count() > 0)
                {
                    var p = services.First();
                    newdata.ResponderId = p.urid;
                    var dist = Utility.distance(newdata.lat.Value, newdata.lon.Value, p.lat.Value, p.lon.Value, 'K');
                    foreach (var item in services)
                    {
                        var dist1 = Utility.distance(newdata.lat.Value, newdata.lon.Value, item.lat.Value, item.lon.Value, 'K');
                        if (dist1 < dist)
                        {
                            dist = dist1;
                            newdata.ResponderId = item.urid;
                        }

                    }
                }
                db.SaveChanges();
            }
            catch (Exception error)
            {
            }
        }


        // This function is displaying data to user of his own reqquest
        [HttpGet]
        public HttpResponseMessage showToRespond(int id)
        {
            try
            {
                var records = db.HelpRequests.Where(h => h.u_id == id).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, records);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // this function is to display all help request to every user
        [HttpGet]
        public HttpResponseMessage ToRespond(int id)
        {
            try
            {
                var records = db.HelpRequests.Where(h => h.ResponderId == id).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, records);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //
        //Add User Rating
        [HttpGet]
        public HttpResponseMessage AddUserRating(int Helpid, String rating)
        {
            HelpRequest result = (from p in db.HelpRequests
                                  where p.Helpid == Helpid
                                  select p).SingleOrDefault();

            result.UserRating = float.Parse(rating);

            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }


        [HttpGet]
        public HttpResponseMessage AddRespRating(int Helpid, float rating)
        {
            HelpRequest result = (from p in db.HelpRequests
                                  where p.Helpid == Helpid
                                  select p).SingleOrDefault();
            result.RespRating = rating;

            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }


        // This function is to update the status

        public HttpResponseMessage allHelpdata()
        {
            try
            {

                var que = db.Users.Select(c => new { id = c.id, firstdname = c.First_Name, lastname = c.Last_Name, email = c.Email }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, que);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        public HttpResponseMessage AllHelpRequest(string type)
        {
            try
            {
                //  Users obj = new Users();
                var user1 = from h in db.HelpRequests
                            where h.u_pcatagory == type


                            select new
                            {

                                h.u_problem,
                                h.u_pcatagory,
                                h.lat,
                                h.lon
                            };
                // obj = db.Users.Select(u => U_id = u.U_id, U_name = u.U_name, U_contact=u.U_contact,U_status=u.U_staus,U_password=u.U_password,U_email=u.U_email);
                return Request.CreateResponse(HttpStatusCode.OK, user1);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage Aservices(int id)
        {
            try
            {

                var user = db.AddServices.Where(v => v.urid == id).GroupBy(v => v.Service_Name)
                    .Select(g => new {
                        Service_Type = g.Key,
                        count = g.Count()
                    })
                    ;

                //  Users obj = new Users();
                //var user = from u in db.AddServices

                //           where u.urid==id
                //           select new
                //           {
                //               u.id,

                //               u.Service_Name,
                //               u.Service_Type,
                //               u.count,
                //               u.DateTime,

                //           };

                // obj = db.Users.Select(u => U_id = u.U_id, U_name = u.U_name, U_contact=u.U_contact,U_status=u.U_staus,U_password=u.U_password,U_email=u.U_email);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        public HttpResponseMessage GetSummary(int id)
        {
            try
            {
                
                
                var user = db.HelpRequests.Where(v => v.ResponderId == id).GroupBy(v => v.u_pcatagory)
                    .Select(g => new {
                        Service_Type = g.Key,
                        count = g.Count(),



                        






                    });


                //  Users obj = new Users();
                //var user = from u in db.AddServices

                //           where u.urid==id
                //           select new
                //           {
                //               u.id,

                //               u.Service_Name,
                //               u.Service_Type,
                //               u.count,
                //               u.DateTime,

                //           };

                // obj = db.Users.Select(u => U_id = u.U_id, U_name = u.U_name, U_contact=u.U_contact,U_status=u.U_staus,U_password=u.U_password,U_email=u.U_email);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet]
        public HttpResponseMessage ResetCount(int id)
        {
            try
            {
                var cnt = 0;
                var user = db.HelpRequests.Where(v => v.ResponderId == id).GroupBy(v => v.u_pcatagory)
                    .Select(g => new {
                        Service_Type = g.Key,
                        count = cnt,

                    });
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);







            }
        }
        [HttpGet]
        public HttpResponseMessage GetResponderdata(int id)
        {
            try
            {
                var cnt = 0;
                var user = db.HelpRequests.Where(v => v.ResponderId == id).GroupBy(v => v.u_pcatagory)
                    .Select(g => new {
                        Service_Type = g.Key,
                        count = cnt,

                    });
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);



            }

        }
        [HttpGet]
        public HttpResponseMessage Task(AddService n)
        {
            try
            {
                db.AddServices.Add(n);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "ok");
            }
            catch (Exception error)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, error.Message);
            }
        }

        // Family Notification Work


        [HttpGet]
        public HttpResponseMessage GetMemberId(string email)
        {
            try
            {


                var records = db.Users.Where(x => x.Email == email);
                return Request.CreateResponse(HttpStatusCode.OK, records);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage AddFamily(Family family)
        {
            try
            {

                db.Families.Add(family);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, family);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet]
        public HttpResponseMessage GetFamily(int id)
        {
            try
            {
                var records = db.Families.Where(x => x.User_id == id);
                if (records != null)
                {
                    var res = from f in db.Families
                              from u in db.Users
                              where f.Member_id == u.id
                              select new
                              {
                                  f.F_Relation,
                                  u.First_Name,
                                  u.Last_Name,
                                  u.loginstatus
                              };
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        public HttpResponseMessage GetUsers(int id)
        {
            try
            {


                var records = db.Families.Where(x => x.User_id == id);
                if (records != null)
                {
                    var result = from u in db.Users
                                 
                                 select new
                                 {
                                     u.First_Name,
                                     u.Last_Name,
                                 };

                }
                return Request.CreateResponse(HttpStatusCode.OK, records);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        public HttpResponseMessage GetlIST(int id)
        {
            try
            {
                var records = db.Families.Where(x => x.User_id == id);
                if (records != null)
                {
                    var res = from f in db.HelpRequests
                              from u in db.Users
                              where f.ResponderId == u.id
                              select new
                              {
                                  
                                  u.First_Name,
                                  u.Last_Name,
                                  
                              };
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


    }
    }