import express from "express";
import {
  creatChallenge,
  getcustomers,
  updateStatus,
  getCategorias,
  getUserByLoginAndPassword,
  getRoles,
  filterCategory,
  editCustomer,
  getCustomerById,
  getcustomersByPage,
  getStatus,
  getProfilePicture,
  editProfilePicture,
  editPhotos,
  getFotos,
  deleteImage,
  avaliation,
  getAvalatiation,
  getComments,
  postComment,
  postReply,
  getReplies,
  editCustomerViewAdm,
  appointments,
  getAppointments,
  obterQRCode,
  enviarMensagem,
  getChallenges,
  getChallengeById,
  updateChallenge,
  registerMember,
  getPositions,
  getMembers,
  getInactiveMembers,
  getMembersbyId,
  editMember,
  getStatusMember,
  changeStatus,
  filterMemberName,
  filterMemberNameInactive,
  getUnits,
  createUnit,
  updateUnit,
  getUnityById,
  getTools,
  createTool,
  updateTools,
  getToolsById,
  updateT,
  getNameUnits,
  getMembersByUnitId,
  addPoints,
  createPublications,
  getPublicationsByChallengeId,
  postLike,
  chellengePoints,
  getChallengePoints,
  getAllMembersWithPoints
} from "../controllers/user.js";

const router = express.Router();

router.get("/getcustomers", getcustomers);
router.get("/getcustomersById/:id", getCustomerById);
router.put("/deleteCustomer", updateStatus);
router.get("/getCategorias", getCategorias);
router.get("/getRoles", getRoles)
router.post("/filterCategory", filterCategory)
router.put("/editCustomer", editCustomer);
router.get("/getcustomersByPage", getcustomersByPage);
router.get("/getStatus/:id", getStatus);
router.get("/getProfilePicture/:id", getProfilePicture)
router.put("/editProfilePicture", editProfilePicture);
router.put("/editPhotos/", editPhotos);
router.get("/getFotos/:id", getFotos)
router.put("/deleteImage", deleteImage);
router.put("/avaliation", avaliation);
router.get("/getAvalatiation/:id", getAvalatiation);
router.get("/getComments/:id", getComments);
router.post("/postComment/:id", postComment);
router.post("/postReply", postReply);
router.post("/getReplies", getReplies)
router.put("/editCustomerViewAdm", editCustomerViewAdm);
router.post("/appointments", appointments);
router.get("/getAppointments", getAppointments)
router.post("/obterQRCode", obterQRCode)
router.post("/enviarMensagem", enviarMensagem)

//APIs clube
router.get("/getChallenges", getChallenges)
router.post("/creatChallenge", creatChallenge);
router.get("/getChallengeById/:id", getChallengeById)
router.put("/updateChallenge", updateChallenge)
router.post("/registerMember", registerMember)
router.post("/getUserByLoginAndPassword", getUserByLoginAndPassword)
router.get("/getPositions", getPositions)
router.get("/getMembers", getMembers)
router.get("/getInactiveMembers", getInactiveMembers)
router.get("/getMembersbyId/:id", getMembersbyId)
router.put("/editMember", editMember);
router.get("/getStatusMember/:id", getStatusMember);
router.put("/changeStatus", changeStatus);
router.post("/filterMemberName", filterMemberName)
router.post("/filterMemberNameInactive", filterMemberNameInactive)

router.get("/getUnits", getUnits)
router.post("/createUnit", createUnit)
router.put("/updateUnit", updateUnit);
router.get("/getUnityById/:id", getUnityById)

router.get("/getTools", getTools)
router.post("/createTool", createTool)
router.put("/updateTools", updateTools);
router.get("/getToolsById/:id", getToolsById);
router.put("/updateT", updateT);



router.get("/getNameUnits", getNameUnits);
router.get("/getMembersByUnitId/:id", getMembersByUnitId)


router.post("/addPoints", addPoints)

router.post("/createPublications", createPublications)
router.get('/getPublicationsById/:challengeId', getPublicationsByChallengeId);
router.post("/postLike", postLike)
// router.get("/getLikes", getLikes)
// router.get("/checkUserLike", checkUserLike)


router.put("/chellengePoints", chellengePoints);
router.get('/getChallengePoints', getChallengePoints);
router.get('/getAllMembersWithPoints', getAllMembersWithPoints);


export default router;
