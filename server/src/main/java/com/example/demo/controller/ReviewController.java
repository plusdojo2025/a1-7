package com.example.demo.controller;

import java.text.SimpleDateFormat;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Partners;
import com.example.demo.entity.Users;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.repository.UsersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ReviewController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PartnersRepository partnersRepository;

    // ここはログインユーザーIDを仮に1と固定（実際はセッション等で取得）
    private static final Integer LOGIN_USER_ID = 1;

    @GetMapping("/review/{partnerId}")
    public String review(
        @PathVariable Integer partnerId,
        Model model
    ) throws JsonProcessingException {

        // ログインユーザー（あなた）
        Users user = usersRepository.findById(LOGIN_USER_ID).orElse(null);
        // お相手
        Partners partner = partnersRepository.findById(partnerId).orElse(null);

        if (user == null || partner == null) {
            return "error";
        }

        // 日付フォーマット用
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");

        // レーダーチャート用データ：理想・お相手・あなた（自分のパラメータ）
        Map<String, Integer> ideal = new LinkedHashMap<>();
        ideal.put("家事スキル", user.getIdealHomeSkill());
        ideal.put("コミュ力", user.getIdealCommunication());
        ideal.put("経済力", user.getIdealEconomicPower());
        ideal.put("容姿", user.getIdealAppearance());
        ideal.put("やさしさ", user.getIdealConsideration());

        Map<String, Integer> partnerScores = new LinkedHashMap<>();
        partnerScores.put("家事スキル", partner.getHomeSkill());
        partnerScores.put("コミュ力", partner.getCommunication());
        partnerScores.put("経済力", partner.getEconomicPower());
        partnerScores.put("容姿", partner.getAppearance());
        partnerScores.put("やさしさ", partner.getConsideration());

        Map<String, Integer> userScores = new LinkedHashMap<>();
        userScores.put("家事スキル", user.getHomeSkill());
        userScores.put("コミュ力", user.getCommunication());
        userScores.put("経済力", user.getEconomicPower());
        userScores.put("容姿", user.getAppearance());
        userScores.put("やさしさ", user.getConsideration());

        ObjectMapper mapper = new ObjectMapper();
        model.addAttribute("idealJson", mapper.writeValueAsString(ideal));
        model.addAttribute("partnerJson", mapper.writeValueAsString(partnerScores));
        model.addAttribute("userJson", mapper.writeValueAsString(userScores));

        // 上部プロフィール表示用
        model.addAttribute("partnerName", partner.getName());
        model.addAttribute("partnerNameRead", partner.getNameRead());
        model.addAttribute("partnerAge", partner.getAge());
        model.addAttribute("partnerBirthday", partner.getBirthday() != null ? sdf.format(partner.getBirthday()) : "");
        model.addAttribute("partnerFirstMetDay", partner.getFirstMetDay() != null ? sdf.format(partner.getFirstMetDay()) : "");
        model.addAttribute("partnerMetEvent", partner.getMetEvent());
        model.addAttribute("partnerFirstImpression", partner.getFirstImpression());

        // 下部詳細比較 5段階評価の項目（理想・お相手）
        Map<String, Integer> detailedIdealScores = new LinkedHashMap<>();
        detailedIdealScores.put("連絡頻度", user.getIdealContactFreq());
        detailedIdealScores.put("主体性", user.getIdealInitiative());
        detailedIdealScores.put("性格", user.getIdealPersonality());
        detailedIdealScores.put("婚活真剣度", user.getIdealMarriageIntent());
        detailedIdealScores.put("金銭感覚", user.getIdealFinancialSense());
        detailedIdealScores.put("喫煙", user.getIdealSmoker());
        detailedIdealScores.put("飲酒", user.getIdealAlcohol());
        detailedIdealScores.put("ギャンブル", user.getIdealGamble());

        Map<String, Integer> detailedPartnerScores = new LinkedHashMap<>();
        detailedPartnerScores.put("連絡頻度", partner.getContactFreq());
        detailedPartnerScores.put("主体性", partner.getInitiative());
        detailedPartnerScores.put("性格", partner.getPersonality());
        detailedPartnerScores.put("婚活真剣度", partner.getMarriageIntent());
        detailedPartnerScores.put("金銭感覚", partner.getFinancialSense());
        detailedPartnerScores.put("喫煙", partner.getSmoker());
        detailedPartnerScores.put("飲酒", partner.getAlcohol());
        detailedPartnerScores.put("ギャンブル", partner.getGamble());

        model.addAttribute("detailedIdealScores", detailedIdealScores);
        model.addAttribute("detailedPartnerScores", detailedPartnerScores);

        // 下部詳細比較 〇×形式の項目（理想・お相手）
        Map<String, Integer> idealFlags = new LinkedHashMap<>();
        idealFlags.put("連れ子の有無", user.getIdealHasChildren());
        idealFlags.put("転勤の有無", user.getIdealTransferable());
        idealFlags.put("運転免許", user.getIdealDriverLicense());
        idealFlags.put("両親との同棲希望", user.getLiveWithParents());
        idealFlags.put("共働き", user.getDualIncome());
        idealFlags.put("子供希望", user.getChildWish());

        Map<String, Integer> partnerFlags = new LinkedHashMap<>();
        partnerFlags.put("連れ子の有無", partner.getHasChildren());
        partnerFlags.put("転勤の有無", partner.getTransferable());
        partnerFlags.put("運転免許", partner.getDriverLicense());
        partnerFlags.put("両親との同棲希望", partner.getLiveWithParents());
        partnerFlags.put("共働き", partner.getDualIncome());

        model.addAttribute("idealFlags", idealFlags);
        model.addAttribute("partnerFlags", partnerFlags);

        return "review"; // review.htmlへ
    }
}
