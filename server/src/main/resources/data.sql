INSERT INTO users (
  mail_address, password, birthday, marriage_start, name, marriage_timing, 
  home_skill, economic_power, appearance, communication, consideration, child_wish, 
  live_with_parents, dual_income, ideal_home_skill, ideal_economic_power, ideal_appearance, 
  ideal_consideration, ideal_communication, ideal_contact_freq, ideal_initiative, ideal_personality, 
  ideal_marriage_intent, ideal_financial_sense, ideal_smoker, ideal_alcohol, ideal_gamble, 
  ideal_has_children, ideal_transferable, ideal_driver_license, ideal_has_divorce, created_at, updated_at
) VALUES
  ('user1@example.com', 'pass1', '1990-01-01', '2023-06-01', '山田太郎', '2025-12-01', 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user2@example.com', 'pass2', '1985-05-15', '2024-01-01', '佐藤花子', '2024-11-01', 2, 4, 4, 2, 4, 1, 1, 1, 2, 4, 3, 3, 4, 3, 3, 4, 3, 2, 4, 3, 2, 1, 2, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user3@example.com', 'pass3', '1992-08-20', '2025-03-01', '鈴木一郎', '2025-06-01', 4, 2, 3, 3, 2, 2, 0, 0, 3, 2, 2, 3, 2, 4, 3, 3, 3, 4, 3, 3, 3, 2, 0, 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user4@example.com', 'pass4', '1988-12-05', '2023-09-01', '高橋美咲', '2024-08-01', 3, 3, 3, 4, 3, 3, 1, 0, 4, 4, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 0, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user5@example.com', 'pass5', '1995-11-30', '2025-05-01', '伊藤健', '2025-07-01', 3, 3, 3, 3, 4, 3, 0, 1, 3, 3, 3, 4, 4, 3, 3, 3, 4, 3, 4, 4, 4, 0, 0, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);





-- パートナー情報（各ユーザーに対して複数の出会い履歴）
INSERT INTO partners (
  id, user_id, name, name_read, age, birthday, met_event, first_met_day, last_met_day,
  first_impression, home_skill, economic_power, appearance, consideration, communication,
  contact_freq, initiative, personality, marriage_intent, financial_sense, smoker,
  alcohol, gamble, has_children, transferable, driver_license, live_with_parents,
  dual_income, created_at, updated_at
) VALUES
  (1, 1, '佐藤 健', 'さとう けん', 30, '1995-04-15', 1, '2023-01-10', '2023-07-10', '爽やか', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 2, 3, 0, '2025-07-20 10:00:00', '2025-07-20 10:00:00'),
  (2, 1, '鈴木 玲子', 'すずき れいこ', 28, '1997-02-20', 3, '2024-02-15', '2025-01-15', '優しい', 2, 2, 3, 3, 2, 3, 3, 2, 3, 2, 0, 1, 0, 3, 1, 2, 2, 1, '2025-07-19 09:30:00', '2025-07-19 09:30:00'),
  (3, 2, '高橋 真', 'たかはし まこと', 35, '1990-11-05', 2, '2023-05-01', '2023-10-01', '頼もしい', 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 1, 3, 0, 1, 3, 0, 1, 3, '2025-07-18 08:20:00', '2025-07-18 08:20:00'),
  (4, 3, '田中 美咲', 'たなか みさき', 26, '1998-07-22', 4, '2024-06-10', '2025-06-10', '明るい', 2, 3, 3, 2, 3, 2, 3, 3, 2, 3, 0, 1, 1, 0, 2, 3, 3, 2, '2025-07-17 12:00:00', '2025-07-17 12:00:00'),
  (5, 2, '井上 翔太', 'いのうえ しょうた', 32, '1992-03-30', 5, '2023-03-25', '2025-03-25', '誠実', 3, 2, 3, 3, 3, 3, 2, 3, 3, 2, 0, 0, 1, 2, 1, 2, 2, 1, '2025-07-16 14:45:00', '2025-07-16 14:45:00');


-- パートナーに対する印象記録（イメージ付きも対応）
INSERT INTO impression_logs (
  id, partner_profiles_id, record_date, impression, mime_type, image_data, created_at, updated_at
) VALUES
  (1, 1, '2025-07-01', 'とても誠実で話しやすい人でした。', 'image/jpeg', NULL, '2025-07-01 12:00:00', '2025-07-01 12:00:00'),
  (2, 2, '2025-07-02', '明るくて元気な印象。', 'image/png', NULL, '2025-07-02 13:30:00', '2025-07-02 13:30:00'),
  (3, 3, '2025-07-03', '頼りがいがありそう。', 'image/jpeg', NULL, '2025-07-03 14:00:00', '2025-07-03 14:00:00'),
  (4, 4, '2025-07-04', '優しい雰囲気の方でした。', 'image/gif', NULL, '2025-07-04 15:15:00', '2025-07-04 15:15:00'),
  (5, 5, '2025-07-05', '落ち着いていて話が合いました。', 'image/jpeg', NULL, '2025-07-05 16:45:00', '2025-07-05 16:45:00');

-- 恋愛フェーズの進行状況（ステータス：0=未到達, 1=進行中, 2=完了）
INSERT INTO love_phases (
  id, users_id, phase, sub_title, total_point, achievement_rate, phase_status, created_at, updated_at
) VALUES
  (1, 1, '出会い', '新しい出会いを楽しもう', 100, 20, 1, '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
  (2, 1, '告白', '気持ちを伝える大切な瞬間', 150, 50, 1, '2025-07-05 14:00:00', '2025-07-05 14:00:00'),
  (3, 2, 'デート', 'デートプランを練ろう', 200, 75, 2, '2025-07-10 18:30:00', '2025-07-10 18:30:00'),
  (4, 3, '信頼構築', 'お互いを理解しよう', 250, 10, 0, '2025-07-12 12:00:00', '2025-07-12 12:00:00'),
  (5, 3, '将来設計', '一緒に未来を考えよう', 300, 0, 0, '2025-07-15 09:00:00', '2025-07-15 09:00:00');

-- 恋愛イベント（check: 0=未完了, 1=完了、type: 0=タスク, 1=イベント）
INSERT INTO love_events (
  id, phase_id, end_check, event_type, event, point, created_at, updated_at
) VALUES
  (1, 1, 0, 0, '自己紹介をする', 10, '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
  (2, 1, 1, 1, '初めてのデート', 30, '2025-07-02 18:00:00', '2025-07-02 18:00:00'),
  (3, 2, 0, 0, '告白の準備をする', 20, '2025-07-05 14:00:00', '2025-07-05 14:00:00'),
  (4, 3, 0, 1, '映画デートを計画', 40, '2025-07-10 18:30:00', '2025-07-10 18:30:00'),
  (5, 4, 0, 0, '悩みを共有する', 50, '2025-07-12 12:00:00', '2025-07-12 12:00:00');

-- デートプラン質問と結論の木構造
INSERT INTO date_spots (
  id, question_id, question, yes_next_id, no_next_id, prev_id, conclusion, created_at, updated_at
) VALUES
  (1, 'Q1', '初デートはカフェに行きたい？', 'Q2', 'A1', NULL, NULL, '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
  (2, 'Q2', '映画を観に行くのはどう？', 'A2', 'A3', 'Q1', NULL, '2025-07-01 10:05:00', '2025-07-01 10:05:00'),
  (3, 'A1', NULL, NULL, NULL, 'Q1', 'カフェデート以外のプランを検討しましょう。', '2025-07-01 10:10:00', '2025-07-01 10:10:00'),
  (4, 'A2', NULL, NULL, NULL, 'Q2', '映画デートプランを提案します。', '2025-07-01 10:15:00', '2025-07-01 10:15:00'),
  (5, 'A3', NULL, NULL, NULL, 'Q2', '別の楽しいアクティビティを探しましょう。', '2025-07-01 10:20:00', '2025-07-01 10:20:00');

-- 婚活計画情報
INSERT INTO marriage_plans (id, users_id, marriage_timing, span_id, span, percentage, created_at, updated_at) VALUES
  (1, 1, '2025-09-01', 1, 3, 0.25, '2025-07-01 09:00:00', '2025-07-01 09:00:00'),
  (2, 2, '2025-10-01', 2, 6, 0.30, '2025-07-02 10:00:00', '2025-07-02 10:00:00'),
  (3, 3, '2025-11-01', 3, 12, 0.20, '2025-07-03 11:00:00', '2025-07-03 11:00:00'),
  (4, 4, '2026-01-01', 4, 24, 0.15, '2025-07-04 12:00:00', '2025-07-04 12:00:00'),
  (5, 5, '2026-03-01', 5, 36, 0.10, '2025-07-05 13:00:00', '2025-07-05 13:00:00');

-- メッセージ履歴
INSERT INTO messages (id, users_id, partners_id, mood, matter, prompt, created_at, updated_at) VALUES
  (1, 1, 1, 1, 1, '初めまして！趣味についてお話しませんか？', '2025-07-20 10:00:00', '2025-07-20 10:00:00'),
  (2, 2, 2, 2, 2, 'こんにちは。最近観た映画について語り合いましょう。', '2025-07-21 11:00:00', '2025-07-21 11:00:00'),
  (3, 3, 3, 3, 1, 'お疲れ様です！週末の予定を教えてください。', '2025-07-22 12:00:00', '2025-07-22 12:00:00'),
  (4, 4, 4, 2, 3, 'はじめまして。旅行の話をしましょうか？', '2025-07-23 13:00:00', '2025-07-23 13:00:00'),
  (5, 5, 5, 1, 2, '最近読んだ本について語り合いませんか？', '2025-07-24 14:00:00', '2025-07-24 14:00:00');
