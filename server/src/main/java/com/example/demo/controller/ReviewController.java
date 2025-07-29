package com.example.demo.controller;

import java.text.SimpleDateFormat;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Partners;
import com.example.demo.entity.Users;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.repository.UsersRepository;

@RestController
public class ReviewController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PartnersRepository partnersRepository;

    // 仮ログイン中のユーザーID（固定）
    private static final Integer LOGIN_USER_ID = 1;

    // React 側 API 用エンドポイント
    @GetMapping("/partner/{partnerId}/")
    public Map<String, Object> getPartnerReviewData(@PathVariable Integer partnerId) {
        Users user = usersRepository.findById(LOGIN_USER_ID).orElse(null);
        Partners partner = partnersRepository.findById(partnerId).orElse(null);

        if (user == null || partner == null) {
            return Map.of("success", false, "message", "ユーザーまたはお相手が見つかりません。");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // 上部レーダーチャート（理想 / お相手 / 自分）
        Map<String, Integer> ideal = Map.of(
            "家事スキル", user.getIdealHomeSkill(),
            "コミュ力", user.getIdealCommunication(),
            "経済力", user.getIdealEconomicPower(),
            "容姿", user.getIdealAppearance(),
            "やさしさ", user.getIdealConsideration()
        );

        Map<String, Integer> partnerScores = Map.of(
            "家事スキル", partner.getHomeSkill(),
            "コミュ力", partner.getCommunication(),
            "経済力", partner.getEconomicPower(),
            "容姿", partner.getAppearance(),
            "やさしさ", partner.getConsideration()
        );

        Map<String, Integer> userScores = Map.of(
            "家事スキル", user.getHomeSkill(),
            "コミュ力", user.getCommunication(),
            "経済力", user.getEconomicPower(),
            "容姿", user.getAppearance(),
            "やさしさ", user.getConsideration()
        );

        // 上部プロフィール情報
        Map<String, Object> partnerProfile = new LinkedHashMap<>();
        partnerProfile.put("name", partner.getName());
        partnerProfile.put("nameRead", partner.getNameRead());
        partnerProfile.put("age", partner.getAge());
        partnerProfile.put("birthday", partner.getBirthday() != null ? sdf.format(partner.getBirthday()) : "");
        partnerProfile.put("firstMetDay", partner.getFirstMetDay() != null ? sdf.format(partner.getFirstMetDay()) : "");
        partnerProfile.put("metEvent", partner.getMetEvent());
        partnerProfile.put("firstImpression", partner.getFirstImpression());

        // 詳細スコア（5段階）
        Map<String, Integer> detailedIdealScores = Map.of(
            "連絡頻度", user.getIdealContactFreq(),
            "主体性", user.getIdealInitiative(),
            "性格", user.getIdealPersonality(),
            "婚活真剣度", user.getIdealMarriageIntent(),
            "金銭感覚", user.getIdealFinancialSense(),
            "喫煙", user.getIdealSmoker(),
            "飲酒", user.getIdealAlcohol(),
            "ギャンブル", user.getIdealGamble()
        );

        Map<String, Integer> detailedPartnerScores = Map.of(
            "連絡頻度", partner.getContactFreq(),
            "主体性", partner.getInitiative(),
            "性格", partner.getPersonality(),
            "婚活真剣度", partner.getMarriageIntent(),
            "金銭感覚", partner.getFinancialSense(),
            "喫煙", partner.getSmoker(),
            "飲酒", partner.getAlcohol(),
            "ギャンブル", partner.getGamble()
        );

        // フラグ比較（〇×形式）
        Map<String, Integer> idealFlags = Map.of(
            "連れ子の有無", user.getIdealHasChildren(),
            "転勤の有無", user.getIdealTransferable(),
            "運転免許", user.getIdealDriverLicense(),
            "両親との同棲希望", user.getLiveWithParents(),
            "共働き", user.getDualIncome()
        );

        Map<String, Integer> partnerFlags = Map.of(
            "連れ子の有無", partner.getHasChildren(),
            "転勤の有無", partner.getTransferable(),
            "運転免許", partner.getDriverLicense(),
            "両親との同棲希望", partner.getLiveWithParents(),
            "共働き", partner.getDualIncome()
        );

        // 全体レスポンス
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("radarChart", Map.of(
            "ideal", ideal,
            "partner", partnerScores,
            "user", userScores
        ));
        response.put("profile", partnerProfile);
        response.put("detailedScores", Map.of(
            "ideal", detailedIdealScores,
            "partner", detailedPartnerScores
        ));
        response.put("flags", Map.of(
            "ideal", idealFlags,
            "partner", partnerFlags
        ));

        return response;
    }
}
