package com.ssafy.api.controller;

<<<<<<< Updated upstream
import com.ssafy.api.request.UserLoginPostReq;
=======
import com.ssafy.api.request.UserInfoChangePutReq;
>>>>>>> Stashed changes
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserInfoChangePutRes;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.domain.user.User;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< Updated upstream
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.HashMap;
import java.util.Map;
>>>>>>> Stashed changes

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러
 */
@Api(value = "유저 API", tags = {"User"})
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    UserService userService;
    PasswordEncoder passwordEncoder;
    
    @PostMapping()
    @ApiOperation(value="회원 가입", notes = "아이디와 패스워드를 통해 회원가입 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody @ApiParam(value="회원가입 정보", required = true)UserRegisterPostReq registerInfo) {
        User user = userService.createUser(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
    
    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴", notes = "아이디와 패스워드를 확인하고 회원 탈퇴한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<? extends BaseResponseBody> withdrawal(@RequestBody @ApiParam(value = "회원탈퇴 정보", required = true) UserLoginPostReq deleteInfo) {
        User user = userService.getUserByPhone(deleteInfo.getPhone());
        if(user!=null){
            if(userService.deleteUser(deleteInfo)){
                // 회원 탈퇴 성공
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            // 인증 실패
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
        }
        // 사용자 없음
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Not Exist"));
    }

//    @GetMapping("/${phone}")
//    public ResponseEntity<UserInfoGetRes> getUserInfo(@PathVariable String phone) {
//        UserInfoGetRes userInfoGetRes = userService.getUserInfo(phone);
//
//        return ResponseEntity.ok(userInfoGetRes);
//    }

//    @PutMapping("/${phone}")
//    public ResponseEntity<Map<String, Boolean>> updateUserInfo(@RequestBody UserInfoChangePutReq request,
//                                                               @PathVariable String phone) {
//        boolean response = userService.updateUserInfo(request, phone);
//        Map<String, Boolean> jsonMap = new HashMap<>();
//        jsonMap.put("isSuccess", response);
//        return ResponseEntity.ok(jsonMap);
//    }
}
